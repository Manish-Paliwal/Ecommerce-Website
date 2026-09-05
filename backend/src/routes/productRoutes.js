import { Router } from "express";
import { addProduct, getProduct, listProducts } from "../controllers/productController.js";

const router = Router();
router.route("/").get(listProducts).post(addProduct);
router.get("/:id", getProduct);
export default router;