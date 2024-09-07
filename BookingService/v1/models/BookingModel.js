const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookingSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    ticketId: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    amount: {
        type: Number
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const BookingModel = mongoose.model('booking', bookingSchema);
module.exports = BookingModel