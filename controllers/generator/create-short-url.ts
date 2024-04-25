import { API_URL, OK_STATUS } from "../../constants";
import httpErrors from "../../misc/errors";
import { registerNewUrl } from "../../models/generator";
import { ControllersMiddleware, DbPool, ErrorCodes } from "../../types";
import { genToken, setResponse } from "../../utils";

export const createShortUrl: ControllersMiddleware = (db) => async (req, res, next) => {
    const { url } = req.body;
    const { user } = res.locals;
    const randomPath = `/${genToken()}`;

    const response = await registerNewUrl(
        await db as DbPool
    )(user.email, randomPath, url);

    if (!response.ok) return next(httpErrors[ErrorCodes.SERVER_ERROR]);

    setResponse<string>(
        res.status(OK_STATUS)
    )({ url: `${API_URL}${randomPath}` })
}