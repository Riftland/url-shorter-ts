import { API_URL, OK_STATUS } from "../../constants";
import httpErrors from "../../misc/errors";
import { retrieveShortsByUser } from "../../models/auth/generator";
import { ControllersMiddleware, DbPool, ErrorCodes, Payload, ShortsByEmail } from "../../types";
import { setResponse } from "../../utils";

export const getUrlsCreated: ControllersMiddleware = (db) => async (_, res, next) => {
    const { user } = res.locals;

    const response = await retrieveShortsByUser(
        await db as DbPool
    )(user.email);

    if (!response.ok) return next(httpErrors[ErrorCodes.SERVER_ERROR]);

    const payload: Payload = {
        shorts: (response.content as ShortsByEmail).map(({ short_url, uses, uses_by_creator }) => ({
            url: `${API_URL}${short_url}`,
            yours: uses_by_creator,
            overall: uses,
        }))
    }

    setResponse<Payload>(
        res.status(OK_STATUS)
    )(payload)
}