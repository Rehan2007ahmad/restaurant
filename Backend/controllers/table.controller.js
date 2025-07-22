const Table = require("../models/table.models");

exports.addTable = async (req, res) => {
  const { tabelName, capacity, type, restaurantId, status } = req.body;
  try {
    if (!tabelName || !capacity || !type || !restaurantId || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const tableExists = await Table.findOne({ tabelName, restaurantId });
    if (tableExists) {
      return res.status(400).json({ message: "Table already exists" });
    }

    const newTable = await Table.create({
      tabelName,
      capacity,
      type,
      restaurantId,
      status,
    });

    res.status(200).json({message:'Table Created successfully', newTable})
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal sercer error", error: error.message });
  }
};

exports.getAllTableByRestaurantId = async (req,res) => {
   const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ message: "Id is required" });
      }
      const tables = await Table.find({ restaurantId: id }).populate(
        "restaurantId"
      );
      if (!tables || tables.length === 0) {
        return res.status(404).json({ message: "No table found" });
      }
      return res.status(200).json(tables);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}

exports.updateTable = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const findTable = await Table.findById(id);

    if (!findTable) {
      return res.status(404).json({ message: "table not found" });
    }

    const updateTable = await Table.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Successfully edited", updateTable });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const table = await Table.findByIdAndDelete(id);

    if (!table) {
      return res.status(404).json({ message: "table not found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTableById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const getTable = await Table.findById(id);

    if (!getTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json(getTable);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};