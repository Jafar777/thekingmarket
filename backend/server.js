import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import categoryRouter from './routes/categoryRoute.js';
import subCategoryRouter from './routes/subCategoryRoute.js';
import productRouter from './routes/productRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // Allow specific domains in production
      const allowedOrigins = [
        'www.thekingmarket.net',,'thekingmarket.net','https://thekingmarket-frontend.vercel.app',
        'https://www.yourdomain.com'
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
// middlewares
app.use(express.json())
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// api endpoints
app.use('/api/product',productRouter)
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);

app.get('/',(req,res)=>{
    res.send("API Working")
})
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .populate('subCategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, ()=> console.log('Server started on PORT : '+ port))