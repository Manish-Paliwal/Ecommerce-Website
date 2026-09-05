import { Router } from "express";
import { createOrder, listOrders } from "../controllers/orderController.js";

const router = Router();
router.route("/").get(listOrders).post(createOrder);
export default router;