const express = require("express");
const {
  createRestaurant,
  getRestaurantById,
  deletRestaurant,
  updateRestaurant,
} = require("../controllers/restaurant.controller");
const router = express.Router();

router.post("/", createRestaurant);
router.get("/:id", getRestaurantById);
router.delete("/:id", deletRestaurant);
router.put("/:id", updateRestaurant);

module.exports = router;
