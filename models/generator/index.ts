import { RECOVER_ORIGIN_URL_OPT, REGISTER_URL_OPT, RETRIEVE_SHORT_BY_EMAIL } from "../../constants";
import { DbError, DbPool, ErrorCodes, ShortsByEmail, UserPayload } from "../../types";
import { catcher, nonOk, setContent, stdErrCB } from "../../utils";
import { insertUrl, selectOriginUrl, selectShortsByEmail, updateStatsByShort } from "./queries";

export const registerNewUrl =
    (db: DbPool) =>
        async (email: string, shortUrl: string, originUrl: string) =>
            catcher<undefined, DbError>(
                async () => {
                    await db.query(insertUrl(email, shortUrl, originUrl));
                },
                stdErrCB(REGISTER_URL_OPT),
            );

export const retrieveOriginUrl =
    (db: DbPool) =>
        async (email: string, shortUrl: string) => {
            return catcher<UserPayload | undefined, DbError>(
                async () => {
                    const response = await db.maybeOne(selectOriginUrl(shortUrl));

                    if (!response?.origin_url) return nonOk(ErrorCodes.NOT_FOUND);

                    const fieldsToUpdate = {
                        uses: response.uses + 1,
                        usesByCreator: email === response.email ?
                            response.uses_by_creator + 1 :
                            response.uses_by_creator,
                    };

                    await db.query(updateStatsByShort(shortUrl, fieldsToUpdate));

                    return setContent({ url: response.origin_url });
                },
                stdErrCB(RECOVER_ORIGIN_URL_OPT),
            );
        };



export const retrieveShortsByUser =
    (db: DbPool) =>
        async (email: string) => {
            return catcher<ShortsByEmail, DbError>(
                async () => {
                    const response = await db.query(selectShortsByEmail(email));

                    return setContent(response.rows as ShortsByEmail);
                },
                stdErrCB(RETRIEVE_SHORT_BY_EMAIL),
            )
        }