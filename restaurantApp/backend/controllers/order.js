import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id }).populate("menuItem");

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let total = 0;

        const items = cartItems.map(item => {
            if (!item.menuItem) return null; // safety if menu deleted

            total += item.menuItem.price * item.quantity;

            return {
                menuItem: item.menuItem._id,
                quantity: item.quantity,
                price: item.menuItem.price
            };
        }).filter(Boolean);

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount: total
        });

        await Cart.deleteMany({ user: req.user._id });

        res.status(201).json({ message: "Order placed", order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.menuItem");

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.menuItem");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user items.menuItem");

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const validStatus = ["Pending", "Preparing", "Delivered", "Cancelled"];

        if (!validStatus.includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        order.status = req.body.status;
        await order.save();

        res.json({ message: "Status updated", order });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Cannot cancel delivered order"
            });
        }

        if (order.status === "Cancelled") {
            return res.status(400).json({
                message: "Order already cancelled"
            });
        }

        order.status = "Cancelled";
        await order.save();

        res.json({ message: "Order cancelled" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentStatus === "Paid") {
            return res.status(400).json({ message: "Already paid" });
        }

        order.paymentStatus = "Paid";
        await order.save();

        res.json({ message: "Payment updated", order });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
    updatePayment
};
