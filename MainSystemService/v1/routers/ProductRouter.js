const express = require('express')
const { getAllProducts, createProduct } = require('../controllers/ProductController')

const productRouter = express.Router()

productRouter.get('/get-all-products', getAllProducts)
productRouter.post('/create-product', createProduct)

module.exports = productRouter