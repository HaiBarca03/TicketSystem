const TicketModel = require('../models/TicketModel')

const getAllTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await TicketModel.findById(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(200).json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error.message);
        return res.status(500).json({ message: 'Error fetching ticket', error: error.message });
    }
};


const createTicket = async (req, res) => {
    try {
        const ticketData = req.body;
        const newTicket = new TicketModel(ticketData);
        const savedTicket = await newTicket.save();
        return res.status(201).json({ message: 'Ticket created successfully', ticket: savedTicket });
    } catch (error) {
        console.error('Error creating ticket:', error.message);
        return res.status(500).json({ message: 'Error creating ticket', error: error.message });
    }
}

const updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        // Ensure the ticket exists before updating
        const ticket = await TicketModel.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update ticket status
        ticket.status = status;
        await ticket.save();

        // Return the updated ticket
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket status', error: error.message });
    }
};

module.exports = { getAllTickets, updateTicketStatus, createTicket, getTicketById }