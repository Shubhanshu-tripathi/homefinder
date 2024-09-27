const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const fs = require('fs');


    
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET 
    });
    
    
const uploadCloudinary = async(localfilePath)=> {
        
    try {
        if (!localfilePath) return null
            const response = await  cloudinary.uploader.upload(localfilePath, { resource_type: "auto" })
                  console.log("file uploaded successfully", response.url);
                  return response
    } catch (error) {
                
          fs.unlinkSync(localfilePath)
    }


}
    
module.exports = uploadCloudinary