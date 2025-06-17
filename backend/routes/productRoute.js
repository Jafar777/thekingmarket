import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct,getProductById } from '../controllers/productController.js'
import upload from '../middleware/multer.js';


const productRouter = express.Router();

productRouter.post('/add', upload.array('images', 10), addProduct); 
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts)
productRouter.get('/:id', getProductById); 
export default productRouter