import { NextFunction, Request, Response, Router } from "express";
import { DatabasePool, SlonikError } from "slonik";

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

export type SuccessResponse<T> = {
  error_code?: string;
  content?: T;
}

export type FailureResponse = string;

export type ModelResponse<T> = {
  ok: boolean,
  message?: string,
  error_code?: string | undefined,
  content?: T | undefined,
};

export type SuccessCB<T> = () => Promise<SuccessResponse<T> | void>;

export type FailureCB<T> = (error: T) => FailureResponse;

export type CatcherFn<T, U> = (successCB: SuccessCB<T>, failureCB: FailureCB<U>) => Promise<ModelResponse<T>>

export type UserPayload = {
  email: string;
  username: string;
}

export type DBError = SlonikError;
