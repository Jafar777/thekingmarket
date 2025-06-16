import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  subCategory: {  // Use consistent naming
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SubCategory' 
  },
  weight: String,
  date: { type: Date, default: Date.now }
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;