const express = require("express");
const {
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
  getAllOrderByRestaurantId,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.get("/getbyid/:id", getOrderById);
router.get("/:id", getAllOrderByRestaurantId);
router.put("/:id", updateOrder);
module.exports = router;
