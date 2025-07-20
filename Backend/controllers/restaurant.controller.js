const Restaurant = require("../models/restaurant.model");

exports.createRestaurant = async (req, res) => {
  const { name, address, logo, owner, phone } = req.body;

  try {
    console.log("data", req.body);
    if (!name || !address || !owner || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRestaurant = await Restaurant.create({
      name,
      address,
      logo,
      owner,
      phone,
    });

    res.status(200).json({
      message: "Restaurant created Success fully",
      Restaurant: newRestaurant,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const RestaurantData = await Restaurant.findById(id).populate(
      "owner",
      "lastName firstName role email"
    );

    if (!RestaurantData) {
      return res.status(400).json({ message: "Restaurant Not found" });
    }

    res.status(200).json(RestaurantData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

exports.deletRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is Required" });
    }

    const findRestaurant = await Restaurant.findOne({ _id: id });
    if (!findRestaurant) {
      res.status(400).json({ message: "Restaurant Not found" });
    }

    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({ message: "Restaurant deletd Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id Is Required" });
    }
    const findRestaurant = await Restaurant.findById(id);

    if (!findRestaurant) {
      return res.status(400).json({ message: "Restaurant Not found" });
    }

    const updatedRestauarnt = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Restaurant Updated", updatedRestauarnt });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
