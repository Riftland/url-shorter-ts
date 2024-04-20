import { NextFunction, Request, Response, Router } from "express";
import { DatabasePool } from "slonik";

export type HttpError = {
  statusCode: number;
  error: Error;
};

export type ErrorsCatalog = Record<string | number, HttpError>;

export type DbPool = DatabasePool;

export type RoutesMiddleware = (db: Promise<DbPool>) => Router;

export type ControllersMiddleware = (
  db?: Promise<DbPool>
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
