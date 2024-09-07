const Booking = require('../v1/models/BookingModel');
const axios = require('axios');
const { publishEvent } = require('./eventBus');

exports.cancelExpiredBookings = async () => {
    try {
        const expiredBookings = await Booking.find({
            status: 'pending',
            expiresAt: { $lt: new Date() }
        });

        for (const booking of expiredBookings) {
            booking.status = 'cancelled';
            await booking.save();

            // Update ticket status
            await axios.put(`${process.env.MAIN_SERVICE_URL}/api/ticket/${booking.ticketId}`, { status: 'available' });

            // Publish event
            publishEvent('BookingExpired', { bookingId: booking._id, userId: booking.userId, ticketId: booking.ticketId });
        }

        console.log(`Cancelled ${expiredBookings.length} expired bookings`);
    } catch (error) {
        console.error('Error cancelling expired bookings:', error);
    }
};