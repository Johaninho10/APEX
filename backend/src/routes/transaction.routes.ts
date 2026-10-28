import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.post("/", authMiddleware, createTransaction);
transactionRouter.delete("/:id", authMiddleware, deleteTransaction);

export default transactionRouter;
