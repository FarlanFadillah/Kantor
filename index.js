const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const process = require('process');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port: ' + process.env.PORT);
});
