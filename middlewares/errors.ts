import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpErrors from "../misc/errors";
import { ErrorCodes, HttpError } from "../types";
import { setResponse } from "../utils";

export const notFound = (_: Request, __: Response, next: NextFunction): void => {
  next(httpErrors[ErrorCodes.NOT_FOUND]);
};

export const errorManager: ErrorRequestHandler = (
  { statusCode, error }: HttpError,
  _,
  res: Response,
  __
): void => {
  setResponse(
    res.status(statusCode as number)
  )(undefined, error?.message);
};
