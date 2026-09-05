import "dotenv/config";
import { connectDatabase } from "./config/db.js";
import Product from "./models/Product.js";

const products = [
  { title: "Linen Edit Shirt", description: "A relaxed, breathable everyday layer.", category: "Men", price: 3699, rating: 4.9, color: "Ivory", image: "/images/shirt.png", stock: 25 },
  { title: "Relaxed Cotton Shirt", description: "Soft cotton with a clean silhouette.", category: "Men", price: 3199, rating: 4.7, color: "Sky", image: "/images/shirt2.png", stock: 18 },
  { title: "Embroidered Kurta", description: "An easy statement for warm days.", category: "Women", price: 5599, rating: 5, color: "White", image: "/images/women.png", stock: 12 },
  { title: "Studio Wrap Dress", description: "A considered shape that moves with you.", category: "Women", price: 6299, rating: 4.6, color: "Coral", image: "/images/women2.jpg", stock: 10 },
  { title: "Everyday Overshirt", description: "A light layer with a relaxed fit.", category: "Men", price: 4299, rating: 4.8, color: "Sage", image: "/images/shirt3.png", stock: 20 },
  { title: "Pleated Day Dress", description: "An easy silhouette for bright days.", category: "Women", price: 5199, rating: 4.7, color: "Rose", image: "/images/women3.jpg", stock: 16 },
  { title: "Printed Summer Dress", description: "A playful print with room to move.", category: "Women", price: 4799, rating: 4.5, color: "Sun", image: "/images/women4.jpg", stock: 14 },
  { title: "Minimal Linen Blazer", description: "Sharp, breathable, and easy to layer.", category: "Men", price: 7799, rating: 4.8, color: "Stone", image: "/images/shirt.png", stock: 9 },
  { title: "Soft Utility Jacket", description: "A practical layer with a soft hand feel.", category: "Men", price: 7299, rating: 4.6, color: "Olive", image: "/images/shirt2.png", stock: 11 },
  { title: "Satin Evening Top", description: "A polished top for after-hours plans.", category: "Women", price: 3999, rating: 4.9, color: "Blue", image: "/images/women3.jpg", stock: 13 },
  { title: "Weekend Layer Set", description: "A comfortable set for little adventures.", category: "Kids", price: 3499, rating: 4.5, color: "Sky", image: "/images/shirt3.png", stock: 8 },
];

await connectDatabase(); await Product.deleteMany(); await Product.insertMany(products); console.log("Products seeded"); process.exit(0);