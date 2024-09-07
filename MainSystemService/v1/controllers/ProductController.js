const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, duration } = req.body;
    try {
        const newProduct = new ProductModel({ name, description, price, duration });
        const savedProduct = await newProduct.save();
        return res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct
        });
    } catch (error) {
        console.error('Error creating product:', error.message);
        return res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
}

module.exports = { getAllProducts, createProduct }