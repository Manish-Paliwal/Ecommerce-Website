import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { name: { type: String, required: true }, email: { type: String, required: true }, address: { type: String, required: true } },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, title: String, price: Number, quantity: { type: Number, min: 1 } }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["pending", "paid", "shipped", "cancelled"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);