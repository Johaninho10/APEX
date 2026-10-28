import type { Request, Response, NextFunction } from "express";

const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err)
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    success: false,
    message: res.statusCode === 200 ? "Internal server error" : err.message,
  });
};

export default errorMiddleware