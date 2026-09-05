import Product from "../models/Product.js";

export async function listProducts(req, res, next) { try { const filter = req.query.category ? { category: req.query.category } : {}; res.json(await Product.find(filter).sort({ createdAt: -1 })); } catch (error) { next(error); } }
export async function getProduct(req, res, next) { try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); res.json(product); } catch (error) { next(error); } }
export async function addProduct(req, res, next) { try { res.status(201).json(await Product.create(req.body)); } catch (error) { next(error); } }