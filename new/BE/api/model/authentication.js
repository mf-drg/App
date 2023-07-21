const  Mongoose  = require("mongoose");

const logSchema = Mongoose.Schema({
    userName:String,
    password:String,
    phone:Number
})
const logModel = Mongoose.model('logCRUD',logSchema)

module.exports = logModel