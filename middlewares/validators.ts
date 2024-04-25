import { Request, Response, NextFunction } from 'express';
import httpErrors from "../misc/errors";
import { ErrorCodes } from '../types';

export const fieldsValidator = (...fields: string[]) => (req: Request, _: Response, next: NextFunction) => {
    for (let field of fields)
        if (!req.body[field]) return next(httpErrors[ErrorCodes.BAD_REQUEST]);

    const { password } = req.body;

    return password && password.length < 4 ?
        next(httpErrors[ErrorCodes.PASS_LENGTH]) :
        next();
}