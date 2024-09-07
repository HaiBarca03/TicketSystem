const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'confirmed'],
        default: 'available'
    },
    product: {
        type: ObjectId,
        ref: 'product',
        required: true
    }
}, {
    timestamps: true
});

const TicketModel = mongoose.model('ticket', ticketSchema);

module.exports = TicketModel