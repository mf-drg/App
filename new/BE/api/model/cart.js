const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    userName:String,
    product:[{
        idProduct :String,
        quantity: Number
    }]
})
const cartModel = mongoose.model('cart',cartSchema)
module.exports = cartModel