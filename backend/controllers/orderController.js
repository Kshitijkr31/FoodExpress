import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import mongoose from "mongoose"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174";

  try {
    const userId = req.body.userId;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId

    // Save order details in database
    const newOrder = new orderModel({
      userId: objectIdUserId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart data
    await userModel.findByIdAndUpdate(objectIdUserId, { cartData: {} });

    // Prepare line items for Stripe Checkout
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ success: false, message: "Error processing order." });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID format" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment is cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error processing order verification." });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const orders = await orderModel.find({ userId: objectIdUserId });

    if (orders.length > 0) {
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "No orders found for this user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching user orders." });
  }
};

// Uncomment and update as needed if you include these endpoints
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error listing orders." });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating status." });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
