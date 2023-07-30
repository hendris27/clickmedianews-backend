const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dxs0yxeyr",
    api_key: "236157336681252",
    api_secret: "V2uHsegpJtBpFlUl3WSwkxdCL0I"
});

async function deleteImageFromCloudinary(publicId) {
    await cloudinary.uploader.destroy(publicId);
}

module.exports = deleteImageFromCloudinary;
