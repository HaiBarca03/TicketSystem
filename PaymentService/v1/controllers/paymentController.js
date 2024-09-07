const Payment = require('../models/paymentModel');
const { publishEvent } = require('../../../BookingService/utils/eventBus');
const zalopayService = require('../../ultis/paymentZaloPay');

const processPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        console.log('bookingId: ', bookingId);

        const zalopayOrder = await zalopayService.createOrder(bookingId);
        console.log('zalopayOrder', zalopayOrder);

        if (zalopayOrder.return_code === 1) {
            const payment = new Payment({
                bookingId,
                status: 'pending',
                transactionId: zalopayOrder.app_trans_id,
                paymentProvider: 'zalopay',
                paymentUrl: zalopayOrder.order_url
            });
            console.log('payment', payment);
            await payment.save();

            publishEvent('PaymentInitiated', {
                bookingId,
                paymentId: payment._id,
                status: 'pending',
                paymentUrl: zalopayOrder.order_url
            });

            res.json({
                status: 'pending',
                paymentId: payment._id,
                paymentUrl: zalopayOrder.order_url
            });
        } else {
            throw new Error(`Failed to create ZaloPay order: ${zalopayOrder.return_message}`);
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = { processPayment };
