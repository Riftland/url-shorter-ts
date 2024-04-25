import { Request, Response, NextFunction } from 'express';
import { URL_TOKEN_LEN } from "../constants";
import httpErrors from '../misc/errors';
import { ErrorCodes } from '../types';

export const checkUrl =
    (tokenLen = URL_TOKEN_LEN) =>
        (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params;

            if (id?.length !== tokenLen) return next(httpErrors[ErrorCodes.NOT_FOUND]);

            res.locals.search = `/${id}`;

            next();
        }