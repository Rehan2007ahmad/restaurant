const express = require("express");
const {
  createAddOns,
  getAllAddOnsByRestaurantId,
  deleteAddOns,
  getAddOnsById,
  updateAddOns,
} = require("../controllers/addOnsExtras.controller");
const router = express.Router();

router.post("/", createAddOns);
router.delete("/:id", deleteAddOns);
router.get("/getbyrestaurantid/:id", getAllAddOnsByRestaurantId);
router.get("/getbyid/:id", getAddOnsById);
router.put("/:id", updateAddOns);

module.exports = router;
