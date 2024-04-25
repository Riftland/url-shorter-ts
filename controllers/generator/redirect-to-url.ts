import httpErrors from "../../misc/errors";
import { retrieveOriginUrl } from "../../models/auth/generator";
import { ControllersMiddleware, DbPool, ErrorCodes } from "../../types";
import { setRedirect } from "../../utils";

export const redirectToUrl: ControllersMiddleware = (db) => async (_, res, next) => {
    const { user, search } = res.locals;

    const response = await retrieveOriginUrl(
        await db as DbPool
    )(user.email, search);

    if (!response.ok) return next(httpErrors[
        response.error_code ??
        ErrorCodes.SERVER_ERROR]
    );

    setRedirect(res)(response.content?.url as string);
}