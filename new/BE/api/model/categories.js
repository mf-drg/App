const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
    name:String,
    image:String
})
const categoriesModel = mongoose.model('categories',categoriesSchema)
module.exports = categoriesModel