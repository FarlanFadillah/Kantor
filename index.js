const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const process = require('process');
const path = require('path');

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', reason => {
    console.error('Unhandled Rejection:', reason);
});


// ssr routes
const userRoute = require('./routes/auth.router');
const adminRoute = require('./routes/admin.router');
const bphtbRoute = require('./routes/bphtb.router');
const clientRoute = require('./routes/client.router');
const alasHakRoute = require('./routes/alas_hak.router');

// api routes
const client_apiRoute = require('./routes/api/client_api.router')

// middlewares
const session = require('./middlewares/sesison.middleware');
const { authentication } = require('./middlewares/auth.middleware');
const {globalErrorHandler} = require("./middlewares/error.middleware");
const { initFormState } = require('./middlewares/form.middleware');

// custom class
const {CustomError} = require("./utils/custom.error");

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// session middleware
app.use(session)

// initialize the form state
app.use(initFormState);

// flash message initiation
app.use((req, res, next)=>{
    res.locals.messages = req.session.messages || [];
    req.session.messages = [];
    next();
})

// save the previous route
app.use((req, res, next)=>{
    res.locals.referer = req.header('Referer') || '';
    next();
})

// set the static files
app.use(express.static(path.join(__dirname, 'src')));

// set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// api route
app.use('/api/client', client_apiRoute);

// public ssr route (order is important)
app.use('/auth', userRoute);
app.use('/error', (req, res, next) => {
    next(new CustomError('User not found', 'error', 401));
})

// protected ssr route (order is important)
app.use(authentication);
app.use('/admin', adminRoute);
app.use('/bphtb', bphtbRoute);
app.use('/client', clientRoute);
app.use('/alas_hak', alasHakRoute);

// handler route that does not exists
app.use((req, res, next)=>{
    next(new CustomError('Sorry, this page does not exist!', 'info', 401));
})

// global error handler
app.use(globalErrorHandler);


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on http://localhost:' + process.env.PORT);
});
