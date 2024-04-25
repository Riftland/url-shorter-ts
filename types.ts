import { NextFunction, Request, Response, Router } from "express";
import { DatabasePool, SlonikError } from "slonik";

export type HttpError = {
  statusCode?: number;
  error?: Error;
};

export type ErrorsCatalog = Record<ErrorCodes, HttpError>;

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
  ok: boolean;
  message?: string;
  error_code?: ErrorCodes;
  content?: T | undefined;
};

export type SuccessCB<T> = () => Promise<SuccessResponse<T> | void>;

export type FailureCB<T> = (error: T) => FailureResponse;

// export type CatcherFn<T, U> = (successCB: SuccessCB<T>, failureCB: FailureCB<U>) => Promise<ModelResponse<T>>

export type DbError = SlonikError;

export type UserPayload = {
  email?: string;
  username?: string;
  url?: string;
}

export enum ErrorCodes {
  BAD_REQUEST = 'bad_request',
  WRONG_DATA = 'wrong_data',
  PASS_LENGTH = 'pass_length',
  UNAUTHORIZED = 'unauthorized',
  CORS = 'cors',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
  NO_ERROR = 'no_error',
};

export type ApiResponse = {
  success: boolean;
  data?: Record<string, string | number>;
  message?: string;
}

// Models types
export type ShortsByEmail = {
  short_url: string;
  uses: number;
  uses_by_creator: number;
}[];

// Controllers payload types
export type Payload = {
  shorts: {
    url: string;
    yours: number;
    overall: number;
  }[];
};