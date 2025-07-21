const express = require("express");
const {
  createMenuCategory,
  getAllMenuCategoryByRestaurantId,
  updateMenuCategory,
  deleteMenuCategory,
  getMenuCategoryById,
} = require("../controllers/menuCategory.controller");
const router = express.Router();

router.post("/", createMenuCategory);
router.get("/:id", getAllMenuCategoryByRestaurantId);
router.put("/:id", updateMenuCategory);
router.delete("/:id", deleteMenuCategory);
router.get("/getbyid/:id", getMenuCategoryById);

module.exports = router;
