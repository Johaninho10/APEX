import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import validator from "validator";

export const getTransactions = asyncHandler(
  async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
      throw new Error("The user id is required");
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
      include: {
        category: true
      }
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  },
);

type CreateTransactionBody = {
  title: string;
  amount: number;
  category_id: string;
  date: string;
};

export const createTransaction = asyncHandler(
  async (
    req: Request<{ userId: string }, unknown, CreateTransactionBody>,
    res: Response,
  ) => {
    const { userId } = req.params;

    if (!userId) {
      throw new Error("The user id is required");
    }

    const { title, amount, category_id, date } = req.body;

    if (!title.trim()) {
      res.status(400);
      throw new Error("The title is required!");
    }

    if (isNaN(amount)) {
      res.status(400);
      throw new Error("The amount should be a number");
    }

    if (amount <= 0) {
      res.status(400);
      throw new Error("The amount should be greater than 0");
    }

    if (!category_id.trim()) {
      res.status(400);
      console.log(category_id);
      throw new Error("The category id is required");
    }

    if (!validator.isDate(date)) {
      res.status(400);
      throw new Error("Enter a valid date");
    }

    const transaction = await prisma.transaction.create({
      data: {
        title: title.trim(),
        amount,
        category_id,
        user_id: userId,
        date: new Date(date),
      },
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully!",
      transaction,
    });
  },
);

export const deleteTransaction = asyncHandler(
  async (req: Request<{ userId: string; id: string }>, res: Response) => {
    const { userId } = req.params;
    const { id } = req.params;

    if (!userId) {
      throw new Error("The user id is required");
    }

    if (!id?.trim()) {
      res.status(400);
      throw new Error("The transaction id is required");
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    if (transaction.user_id !== userId) {
      res.status(401);
      throw new Error("You are not allowed to delete this transaction");
    }

    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfullsy",
    });
  },
);
