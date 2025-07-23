const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },

});

const orderSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema], 
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "served", "paid", "cancelled"],
    default: "pending",
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  notes:{
    type:String
  }
});

module.exports = mongoose.model("Order", orderSchema);
