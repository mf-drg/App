const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:String,
    ingredients:String,
    price:String,
    image:String,
    categories: String,
    favorite:Boolean
})
const productModel = mongoose.model('product',productSchema)
module.exports = productModel