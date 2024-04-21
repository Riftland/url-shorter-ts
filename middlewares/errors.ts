import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpErrors from "../misc/errors";
import { HttpError } from "../types";

export const notFound = (_: Request, __: Response, next: NextFunction): void => {
  next(httpErrors[404]);
};

export const errorManager: ErrorRequestHandler = (
  { statusCode, error }: HttpError,
  _,
  res: Response,
  __
): void => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};
