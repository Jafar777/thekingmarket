import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import { logActivity } from './activityController.js';

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
        await logActivity('product_added', `New product added: ${product.name}`);


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
    // Get ID from URL parameters instead of request body
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await productModel.findById(id)
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
export const getProductById = async (req, res) => {
  try {
    console.log(`Fetching product with ID: ${req.params.id}`);
    
   const product = await productModel.findById(req.params.id)
      .populate('category', 'name')
      .populate('subCategory', 'name'); // Changed from 'subcategory' to 'subCategory'
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('Product found:', product.name);
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};
// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
    .populate('category')
    .populate('subCategory');
  await logActivity('product_updated', `Product updated: ${updatedProduct.name}`);

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Internal Server Error" 
    });
  }

};
// Add this to your productController
export const updateProductImages = async (req, res) => {
  try {
    const { id } = req.params;
    const keptImages = JSON.parse(req.body.keptImages || '[]');
    
    // Upload new images to Cloudinary
    const newUrls = [];
    for (const file of req.files) {
      const result = await new Promise((resolve) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve(null);
          }
          resolve(result);
        });
        stream.end(file.buffer);
      });

      if (result) {
        newUrls.push(result.secure_url);
      }
    }

    // Combine kept images with new images
    const updatedImages = [...keptImages, ...newUrls];
    
    // Update product with new images
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { images: updatedImages },
      { new: true }
    );
    
    res.json({
      success: true,
      message: "Images updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};