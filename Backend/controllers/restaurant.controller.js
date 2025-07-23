const mongoose = require("mongoose")
const Restaurant = require("../models/restaurant.model");
const AddOns = require('../models/addOnsExtras.models')
const Menu = require('../models/menu.models')
const MenuCategory = require('../models/menuCategory.models')
const Order = require('../models/order.models')
const Table = require('../models/table.models')

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
 try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await Promise.all([
      AddOns.deleteMany({ restaurantId: id }),
      Menu.deleteMany({ restaurantId: id }),
      MenuCategory.deleteMany({ restaurantId: id }),
      Order.deleteMany({ restaurantId: id }),
      Table.deleteMany({ restaurantId: id }),
    ]);

    await Restaurant.findByIdAndDelete(id)

    res.status(200).json({ message: "Restaurant and all related data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
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
