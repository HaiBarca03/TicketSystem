require('dotenv').config()
const mongoose = require('mongoose');

const DATABASE = process.env.DB_MAIN_CONNECT

const dbConnect = () => {
    try {
        mongoose.connect(DATABASE);
        console.log('db connected successfully');
    } catch (error) {
        console.error('db connection failed:', error);
    }
}

module.exports = dbConnect;