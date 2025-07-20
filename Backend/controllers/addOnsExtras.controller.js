const AddOns = require("../models/addOnsExtras.models");
const Restaurant = require("../models/restaurant.model");

exports.createAddOns = async (req, res) => {
  const { type, name, image, actualprice, discount, remarks, restaurantId } =
    req.body;

  try {
    if (!type || !name || !image || !actualprice || !remarks || !restaurantId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if restaurantId exists
    const restaurantExists = await Restaurant.findById(restaurantId);
    if (!restaurantExists) {
      return res.status(400).json({ message: "Invalid restaurantId: restaurant does not exist" });
    }

    const AddOnsExists = await AddOns.findOne({ name, restaurantId });
    if (AddOnsExists) {
      return res.status(400).json({ message: "Add ons already exists" });
    }
    const finalPrice = actualprice - discount;
    const createAddOns = await AddOns.create({
      type,
      name,
      image,
      actualprice,
      price: finalPrice,
      discount,
      remarks,
      restaurantId,
    });

    res
      .status(200)
      .json({ message: "Add ons created Successfully", createAddOns });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllAddOnsByRestaurantId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    
    const findAddons = await AddOns.find({ restaurantId: id }).populate('restaurantId')
    if (!findAddons || findAddons.length === 0) {
      return res.status(404).json({ message: "No add-ons found" });
    }
    return res.status(200).json({ addOns: findAddons });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
