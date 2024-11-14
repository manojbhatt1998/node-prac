const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


// MongoDB connection
 mongoose.connect('mongodb://localhost:27017/ecom');
 
 const productSchema  = new mongoose.Schema({
        name: String,
        brand:String,
  });

// Create a model for the product
const ProductModel = mongoose.model('product', productSchema,'product'); //'product' is collection name here

module.exports = ProductModel;

// Save data to the database
// const SaveInDb = async () => {
//     try {
//         const data = new ProductModel({ name: 'Mi 13', brand: 'Mi' });
//         const result = await data.save();
//         console.log('Data saved:', result);
//     } catch (error) {
//         console.error('Error saving data:', error);
//     }
// };

// SaveInDb();
