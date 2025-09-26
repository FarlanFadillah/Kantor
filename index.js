const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const process = require('process');
const path = require('path');

// routes
const homeRoute = require('./routes/home.router');
const userRoute = require('./routes/auth.router');
const adminRoute = require('./routes/admin.router');
const bphtbRoute = require('./routes/bphtb.router');

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

// set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// public route (order is important)
app.get('/', (req, res) => {
    res.redirect(`/admin/dashboard`);
})
app.use('/auth', userRoute);

// protected route (order is important)
app.use('/', authentication, homeRoute);
app.use('/admin', authentication, adminRoute);
app.use('/bphtb', bphtbRoute);


// global error handler
app.use((err, req, res, next)=>{
    console.log('global erorrs handler', err.message);

    console.log(err);
    res.status(400).send('Something Broke');
})


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on http://localhost:' + process.env.PORT);
});
