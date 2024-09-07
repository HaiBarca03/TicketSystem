const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        required: true
    },
    paymentProvider: {
        type: String,
        required: true
    },
    paymentUrl: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('payment', paymentSchema);