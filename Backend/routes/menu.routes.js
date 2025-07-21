const express = require("express");
const {
  createMenu,
  getAllMenuByRestaurantId,
  updateMenu,
  deleteMenu,
  getMenuById,
} = require("../controllers/menu.controller");

const router = express.Router();

router.post("/", createMenu);
router.get("/:id", getAllMenuByRestaurantId);
router.get("/getbyid/:id", getMenuById);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
