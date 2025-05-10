import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if(products.length > 0) {
            res.status(200).json({ success: true, data: products })
        } else {
            res.status(200).json({ success: true, message: "Please create a new product to view!" })
        }
    } catch (error) {
        res.status(200).json({  success: false, message: "No products found!" })
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Product created!" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id!"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product not found!" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product not found!" });
    }
};