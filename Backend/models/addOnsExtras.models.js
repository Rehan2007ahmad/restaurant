const mongoose = require("mongoose");

const addOnsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Veg", "Non-Veg", "Non-Veg-Halal", "Spicy", "Sugar-free"],
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    actualprice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddOns", addOnsSchema);
