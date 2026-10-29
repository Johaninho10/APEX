import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.get("/:userId", getTransactions);
transactionRouter.post("/:userId", createTransaction);
transactionRouter.delete("/:userId/:id", deleteTransaction);

export default transactionRouter;
