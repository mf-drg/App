const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
    userName:String,
    idProduct:[String]
})
const favoriteModel = mongoose.model('favorite',favoriteSchema)
module.exports = favoriteModel