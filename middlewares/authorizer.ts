import { Request, Response, NextFunction } from "express";
import serializer from 'simple-stateless-auth-library-ts';
import httpErrors from "../misc/errors";
import { ErrorCodes } from "../types";

export const authorizer =
    (strict = true) =>
        (req: Request, res: Response, next: NextFunction) => {
            const payload = serializer.deserialize(req);

            if (strict && !payload) return next(httpErrors[ErrorCodes.UNAUTHORIZED]);

            res.locals.user = payload ?? {};

            next();
        }