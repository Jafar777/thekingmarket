import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  // Add debug logs to verify values
  console.log("Cloudinary Config:");
  console.log("Name:", process.env.CLOUDINARY_NAME);
  console.log("Key:", process.env.CLOUDINARY_API_KEY);
  console.log("Secret:", process.env.CLOUDINARY_API_SECRET ? "*****" : "MISSING");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

export default connectCloudinary;