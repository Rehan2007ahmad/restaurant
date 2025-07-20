const MenuCategory = require("../models/menuCategory.models");
const restaurantModel = require("../models/restaurant.model");

exports.createMenuCategory = async (req, res) => {
  const { categoryName, image, restaurantId } = req.body;
  try {
    if (!categoryName || !image || !restaurantId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findRestaurant = await restaurantModel.findById(restaurantId)
    if(!findRestaurant){
        return res.status(404).json({message:'Restaurant not found'})
    }
    const category = await MenuCategory.findOne({ categoryName,restaurantId });

    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await MenuCategory.create({
      categoryName,
      image,
      restaurantId,
    });

    res.status(200).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" , error});
  }
};

exports.getAllMenuCategoryByRestaurantId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const categories = await MenuCategory.find({ restaurantId: id }).populate(
      "restaurantId"
    );
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.status(200).json( categories );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateMenuCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const findCategory = await MenuCategory.findById(id);

    if (!findCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updateCategory = await MenuCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Successfully edited", updateCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteMenuCategory = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const Category = await MenuCategory.findByIdAndDelete(id);

    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
