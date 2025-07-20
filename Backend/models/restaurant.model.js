const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phone:{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
