const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const process = require('process');
const path = require('path');

// ssr routes
const userRoute = require('./routes/auth.router');
const adminRoute = require('./routes/admin.router');
const bphtbRoute = require('./routes/bphtb.router');
const clientRoute = require('./routes/client.router');

// api routes
const client_apiRoute = require('./routes/api/client_api.router')

// middlewares
const session = require('./middlewares/sesison.middleware');
const { authentication } = require('./middlewares/auth.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// session middleware
app.use(session)

// flash message initiation
app.use((req, res, next)=>{
    res.locals.messages = req.session.messages || [];
    req.session.messages = [];
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
app.get('/', (req, res) => {
    res.redirect(`/admin/dashboard`);
})
app.use('/auth', userRoute);

// protected ssr route (order is important)
app.use('/admin', authentication, adminRoute);
app.use('/bphtb', bphtbRoute);
app.use('/client', clientRoute);


// global error handler
app.use((err, req, res, next)=>{
    console.log('global erorrs handler', err.message);

    console.log(err);
    res.status(400).send('Something Broke');
})


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on http://localhost:' + process.env.PORT);
});
