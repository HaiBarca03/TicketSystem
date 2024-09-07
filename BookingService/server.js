const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const dbConnect = require('./config/db');

const app = express();

// routers
const bookingRoutes = require('./v1/routers/BookingRouter');
const { cancelExpiredBookings } = require('./v1/controllers/BookController');

// config
const port = process.env.PORT || 4001
dotenv.config();
app.use(express.json());

// db connect
dbConnect()

// api
app.use('/api/booking', bookingRoutes);

const job = schedule.scheduleJob('*/5 * * * *', async () => {
    try {
        await cancelExpiredBookings();
        console.log('Cancelled successfully.');
    } catch (error) {
        console.error('Error cancelling bookings:', error);
    }
});

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
