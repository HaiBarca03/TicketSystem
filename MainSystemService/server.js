const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnect = require('./config/db')

// router
const userRoutes = require('./v1/routers/UserRouter');
const ticketRoutes = require('./v1/routers/TicketRouter');
const productRoutes = require('./v1/routers/ProductRouter');

const app = express()

// config
const port = process.env.PORT || 4000
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()

// db connect
dbConnect()

// api
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/ticket', ticketRoutes);

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})