import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransactions,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.get("/:userId", getTransactions);
transactionRouter.get("/summary/:userId", getSummary);
transactionRouter.post("/:userId", createTransaction);
transactionRouter.delete("/:userId/:id", deleteTransaction);

export default transactionRouter;
