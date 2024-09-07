const express = require('express')
const { getAllTickets, updateTicketStatus, createTicket, getTicketById } = require('../controllers/TickerController')

const ticketRouter = express.Router()

ticketRouter.get('/', getAllTickets)
ticketRouter.get('/:id', getTicketById)
ticketRouter.put('/update-ticket/:ticketId', updateTicketStatus)
ticketRouter.post('/create-ticket', createTicket)

module.exports = ticketRouter