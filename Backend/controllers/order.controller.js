const MenuItem = require("../models/menu.models");
const Order = require("../models/order.models");

exports.createOrder = async (req, res) => {
  try {
    const { table, waiter, restaurantId, orderItems, notes } = req.body;

    if (!table || !waiter || !restaurantId || !orderItems?.length) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const menuItemIds = orderItems.map((item) => item.menuItem);

    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

    const priceMap = new Map();
    menuItems.forEach((item) => {
      priceMap.set(item._id.toString(), item.price);
    });

    let totalAmount = 0;

    for (const item of orderItems) {
      const price = priceMap.get(item.menuItem.toString());

      if (!price || isNaN(price)) {
        return res
          .status(400)
          .json({
            message: `Invalid menuItem price for item ID: ${item.menuItem}`,
          });
      }

      const quantity = Number(item.quantity) || 0;

      totalAmount += price * quantity;
    }

    const newOrder = await Order.create({
      table,
      waiter,
      restaurantId,
      orderItems,
      totalAmount,
      notes,
    });

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("table")
      .populate("waiter", "restaurantId firstName lastName role")
      .populate("orderItems");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status, orderItems, notes } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(orderItems && { orderItems }),
        ...(notes && { notes }),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};

exports.getAllOrderByRestaurantId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const orders = await Order.find({ restaurant: id })
      .populate("table")
      .populate("waiter", "restaurantId firstName lastName role")
      .populate("orderItems")
      .sort({ createdAt: -1 });

    if (!orders || orders.length == 0) {
      return res.status(404).json({ message: "orders not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
