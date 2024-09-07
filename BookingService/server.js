const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const dbConnect = require('./config/db');

const app = express();

// routers
const bookingRoutes = require('./v1/routers/BookingRouter');

// config
const port = process.env.PORT || 4001
dotenv.config();
app.use(express.json());

// db connect
dbConnect()

// api
app.use('/api/booking', bookingRoutes);

// tiny task scheduler
cron.schedule('*/5 * * * *', async () => {
    const { cancelExpiredBookings } = require('./utils/bookingUtils');
    await cancelExpiredBookings();
});

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
