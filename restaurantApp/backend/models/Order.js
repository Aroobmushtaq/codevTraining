import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Preparing", "Delivered", "Cancelled"],
    default: "Pending",
  },

  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },
},
{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
