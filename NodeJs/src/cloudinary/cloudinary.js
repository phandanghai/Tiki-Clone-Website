// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
   cloud_name: 'drvdebpw2',
   api_key: '454137898791297',
   api_secret: 'tEs7h8Ac_WQ2t77LjH8Anxb5StM',
});

module.exports = cloudinary;
