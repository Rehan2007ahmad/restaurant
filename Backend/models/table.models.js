const mongoose  = require("mongoose");

const tableSchema = new mongoose.Schema({
    tabelName:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  status:{
    type:String,
    required:true,
    enum:["open", "occupied"]
  }
},{timestamps:true})

module.exports = mongoose.model('Table', tableSchema)