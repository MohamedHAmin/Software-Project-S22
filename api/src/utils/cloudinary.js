const cloudinary = require("cloudinary").v2;
const check=require("../models/check")
console.log("🚀 ~ file: cloudinary.js ~ line 3 ~ process.env.CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME)
const d=async()=>{
  const c=new check({check:process.env.CLOUDINARY_CLOUD_NAME})
  await c.save()
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
