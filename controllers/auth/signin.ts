import serializer, { hash } from "simple-stateless-auth-library-ts";
import { ControllersMiddleware, DbPool, ErrorCodes, UserPayload } from "../../types";
import { selectUser } from "../../models/auth";
import httpErrors from "../../misc/errors";

export const signin: ControllersMiddleware = (db) => async (req, res, next) => {
    const { email, password } = req.body;

    const response = await selectUser(
        await db as DbPool
    )(email, hash.compare(password));

    if (!response.ok) return next(
        httpErrors[response.error_code ??
        ErrorCodes.SERVER_ERROR]
    );

    serializer.serialize(res, response.content as UserPayload);

    res.status(200).json({
        success: true,
    })
}