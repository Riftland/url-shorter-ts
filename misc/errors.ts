import { ErrorCodes, ErrorsCatalog } from "../types";

const httpErrors: ErrorsCatalog = {
  [ErrorCodes.BAD_REQUEST]: {
    statusCode: 400,
    error: new Error("all fields are mandatory"),
  },
  [ErrorCodes.WRONG_DATA]: {
    statusCode: 400,
    error: new Error("username or password incorrects"),
  },
  [ErrorCodes.PASS_LENGTH]: {
    statusCode: 400,
    error: new Error("password length must be at least 4"),
  },
  [ErrorCodes.UNAUTHORIZED]: {
    statusCode: 401,
    error: new Error("unauthorized"),
  },
  [ErrorCodes.CORS]: {
    statusCode: 401,
    error: new Error("unauthorized by CORS error"),
  },
  [ErrorCodes.NOT_FOUND]: {
    statusCode: 404,
    error: new Error("path not found"),
  },
  [ErrorCodes.SERVER_ERROR]: {
    statusCode: 500,
    error: new Error("something went wrong!"),
  },
  [ErrorCodes.NO_ERROR]: {}
};

export default httpErrors;
