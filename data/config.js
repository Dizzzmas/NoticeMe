const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
    cloud_name: 'dv0smnf2u',
    api_key: '262969138672994',
    api_secret: 'U-EdTEBagFF-1UqYO2RrmJeykFQ'
});

const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "demo",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

module.exports = parser;