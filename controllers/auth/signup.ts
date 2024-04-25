import { hash } from "simple-stateless-auth-library-ts";
import { ControllersMiddleware, DbPool, ErrorCodes } from "../../types";
import { createUser } from "../../models/auth";
import httpErrors from "../../misc/errors";
import { setResponse } from "../../utils";
import { OK_STATUS } from "../../constants";

export const signup: ControllersMiddleware = (db) => async (req, res, next) => {
    const { email, username, password } = req.body;

    const response = await createUser(
        await db as DbPool
    )(email, username, await hash.encrypt(password as string));

    if (!response.ok) return next(httpErrors[ErrorCodes.SERVER_ERROR]);

    setResponse<undefined>(
        res.status(OK_STATUS)
    )();
}