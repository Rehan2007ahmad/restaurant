const Menu = require("../models/menu.models");

exports.createMenu = async (req, res) => {
  const { name, image, restaurantId } = req.body;

  try {
    if (!name || !image || !restaurantId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const nameExists = await Menu.findOne({ name });

    if (nameExists) {
      return res.status(400).json({ message: "Name Already exists" });
    }

    const newMenu = await Menu.create({
      name,
      image,
      restaurantId,
    });

    res.status(200).json({ message: "new menu created successfully", newMenu });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllMenuByRestaurantId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const menus = await Menu.find({ restaurantId: id }).populate(
      "restaurantId"
    );

    if (!menus || menus.length == 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json(menus);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const findMenu = await Menu.findById(id);

    if (!findMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const updateMenu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Successfully edited", updateMenu });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const Menus = await Menu.findByIdAndDelete(id);

    if (!Menus) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const getMenu = await Menu.findById(id);

    if (!getMenu) {
      return res.status(404).json({ message: "Menu  not found" });
    }

    res.status(200).json(getMenu);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
