const express = require("express");
const { addTable, getAllTableByRestaurantId, updateTable, deleteTable, getTableById } = require("../controllers/table.controller");

const router = express.Router();

router.post("/", addTable);
router.get("/:id", getAllTableByRestaurantId);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);
router.get("/getbyid/:id", getTableById);


module.exports = router;
