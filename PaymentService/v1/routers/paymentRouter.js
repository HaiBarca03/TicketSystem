const express = require('express')
const { processPayment } = require('../controllers/paymentController')

const paymentRouter = express.Router()

paymentRouter.post('/process', processPayment);

module.exports = paymentRouter