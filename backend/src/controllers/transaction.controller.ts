import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import validator from "validator";

export const getTransactions = asyncHandler(
  async (
    req: Request<
      { userId: string },
      unknown,
      unknown,
      { page?: string; type?: "EXPENSE" | "INCOME" }
    >,
    res: Response,
  ) => {
    const { userId } = req.params;
    const { page = "1", type } = req.query;

    if (!userId) {
      throw new Error("The user id is required");
    }

    if (isNaN(Number(page))) {
      res.status(400);
      throw new Error("Invalid page format!");
    }

    const where: any = { user_id: userId };

    if (type) {
      if (type !== "EXPENSE" && type !== "INCOME") {
        res.status(400);
        throw new Error("Invalid type value");
      }

      where.category = { type };
    }

    const take = 10;

    const total = await prisma.transaction.count({
      where
    })

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        category: true,
      },
      take,
      skip: (Number(page) - 1) * take,
      orderBy: {
        date: "desc"
      }
    });

    res.status(200).json({
      success: true,
      transactions,
      total,
      page,
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

    if (!validator.isISO8601(date) && !validator.isDate(date)) {
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
      include: {
        category: true,
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

export const getSummary = asyncHandler(
  async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    const incomesAggr = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: userId,
        category: {
          type: "INCOME",
        },
      },
    });

    const expensesAggr = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: userId,
        category: {
          type: "EXPENSE",
        },
      },
    });

    const incomes = incomesAggr._sum.amount || 0;
    const expenses = expensesAggr._sum.amount || 0;
    const balance = incomes - expenses;

    res.status(200).json({
      success: true,
      incomes,
      expenses,
      balance,
    });
  },
);
