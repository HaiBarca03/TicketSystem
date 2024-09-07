const crypto = require('crypto-js');
const axios = require('axios');

class ZaloPayService {
    constructor() {
        this.config = {
            app_id: process.env.ZALOPAY_APP_ID,
            key1: process.env.ZALOPAY_KEY1,
            key2: process.env.ZALOPAY_KEY2,
            create_order_url: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
        };
    }

    async createOrder(bookingId, amount) {
        const embed_data = JSON.stringify({});
        const items = JSON.stringify([]);
        const transID = `${Date.now()}_${bookingId}`;
        const order = {
            app_id: this.config.app_id,
            app_trans_id: transID,
            app_user: "user123",
            app_time: Date.now(),
            item: items,
            embed_data: embed_data,
            description: `Payment for booking ${bookingId}`,
            bank_code: "zalopayapp",
            amount: amount // Include the amount in the order
        };

        const dataToSign = `${this.config.app_id}|${order.app_trans_id}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        const signature = crypto.HmacSHA256(dataToSign, this.config.key1).toString(crypto.enc.Hex);

        order.signature = signature;

        console.log('Order Data:', JSON.stringify(order, null, 2));

        try {
            const response = await axios.post(this.config.create_order_url, order, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Response Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('ZaloPay create order error:', error);
            throw error;
        }
    }
}

module.exports = new ZaloPayService();
