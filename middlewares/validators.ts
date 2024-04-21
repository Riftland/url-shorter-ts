import { Request, Response, NextFunction } from 'express';
import httpErrors from "../misc/errors";

export const fieldsValidator = (...fields: string[]) => (req: Request, _: Response, next: NextFunction) => {
    for (let field of fields) {
        if (!req.body[field]) return next(httpErrors[400]);
    }

    const { password } = req.body;

    return password && password.length < 4 ? next(httpErrors["pass_length"]) : next();
}