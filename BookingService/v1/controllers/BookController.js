const Booking = require('../models/BookingModel');
const axios = require('axios');
const { publishEvent } = require('../../utils/eventBus');

const createBooking = async (req, res) => {
    try {
        const { userId, ticketId } = req.body;

        // Start Saga
        // Check ticket availability
        const ticketResponse = await axios.get(`${process.env.MAIN_SERVICE_URL}/api/ticket/${ticketId}`);
        if (ticketResponse.data.status !== 'available') {
            throw new Error('Ticket not available');
        }

        // Create booking
        const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes from now
        const booking = new Booking({ userId, ticketId, expiresAt });
        await booking.save();

        // Update ticket status
        const updateStatus = await axios.put(`${process.env.MAIN_SERVICE_URL}/api/ticket/update-ticket/${ticketId}`, { status: 'booked' });
        console.log('updateStatus', updateStatus.data.status)

        // Publish event
        publishEvent('BookingCreated', { bookingId: booking._id, userId, ticketId });

        res.status(201).json(booking);
    } catch (error) {
        // Compensating transactions
        // If any step fails, revert the changes
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

const confirmBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Start Saga
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'pending') {
            throw new Error('Invalid booking');
        }

        // Process payment
        const paymentResponse = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/api/payment/process`, {
            bookingId
        });

        if (paymentResponse.data.status !== 'success') {
            throw new Error('Payment failed');
        }

        booking.status = 'confirmed';
        await booking.save();

        const updateStatus = await axios.put(`${process.env.MAIN_SERVICE_URL}/api/ticket/update-ticket/${booking.ticketId}`, { status: 'confirmed' });

        publishEvent('BookingConfirmed', { bookingId: booking._id, userId: booking.userId, ticketId: booking.ticketId });

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error confirming booking', error: error.message });
    }
};


module.exports = { createBooking, confirmBooking }