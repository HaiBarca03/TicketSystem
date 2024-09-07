const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require("body-parser");
const dbConnect = require('./config/db')

const app = express();

// router
const paymentRoutes = require('./v1/routers/paymentRouter');

// config
const port = process.env.PORT || 4002
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// db connect
dbConnect()

// api
app.use('/api/payment', paymentRoutes);

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})