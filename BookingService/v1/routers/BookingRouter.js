const express = require('express');
const { createBooking, confirmBooking } = require('../controllers/BookController');
const bookingRouter = express.Router();

bookingRouter.post('/create-booking', createBooking);
bookingRouter.put('/:bookingId/confirm', confirmBooking);

module.exports = bookingRouter;