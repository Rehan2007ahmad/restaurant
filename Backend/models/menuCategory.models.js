const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    }
},{timestamps:true})


module.exports = mongoose.model('MenuCategory', menuSchema)