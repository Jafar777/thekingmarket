import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add product
export const addProduct = async (req, res) => {
    try {
         console.log("Request Body:", req.body);
    console.log("Files:", req.files);
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images uploaded"
            });
        }

        const imageUrls = [];

        // Upload all images to Cloudinary
        for (const file of req.files) {
            const result = await new Promise((resolve) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        return resolve(null);
                    }
                    resolve(result);
                });
                stream.end(file.buffer);
            });

            if (result) {
                imageUrls.push(result.secure_url);
            }
        }

        // Extract fields from request body
        const {
            name,
            description,
            category,
            price,
            subcategory: subCategory,  // Fix field name here
            weight
        } = req.body;
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            images: imageUrls,
            weight,
            date: Date.now(),
            // Set default values for optional fields
            bestseller: req.body.bestseller === "true",
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : []
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Function for list products
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find()
            .populate('category')
            .populate('subCategory');

        res.status(200).json(products);
    } catch (error) {
        console.error('Error listing products:', error);
        res.status(500).json({
            message: error.message || "Failed to fetch products",
            error: 'Database error'
        });
    }
};

// Function for removing product
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        await productModel.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Product Removed Successfully"
        });

    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Function for single product info
export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await productModel.findById(productId)
            .populate('category')
            .populate('subCategory');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};