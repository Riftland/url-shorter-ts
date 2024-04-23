import { insertUser, selectByEmail } from "./queries";
import { DbError, DbPool, ErrorCodes, UserPayload } from "../../types";
import { catcher, extract, nonOk, setContent, stdErrCB } from "../../utils";
import { CREATE_USER_OPT, SELECT_USER_OPT } from "../../constants";

export const createUser =
    (db: DbPool) =>
        async (email: string, username: string, password: string) =>
            catcher<undefined, DbError>(
                async () => {
                    await db.query(insertUser(email, username, password));
                },
                stdErrCB(CREATE_USER_OPT)
            );

export const selectUser =
    (db: DbPool) =>
        async (
            email: string,
            compareFn: (hash: string) => Promise<boolean> // importar tipo desde la librería simple-stateless-auth-library-ts
        ) =>
            catcher<UserPayload | undefined, DbError>(
                async () => {
                    const user = await db.maybeOne(selectByEmail(email));

                    if (!user) return nonOk(ErrorCodes.WRONG_DATA);

                    const areEqual = await compareFn(user.password);

                    if (!areEqual) return nonOk(ErrorCodes.WRONG_DATA);

                    return setContent(
                        extract<UserPayload, keyof UserPayload>(
                            'email', 'username'
                        )(user)
                    );
                },
                stdErrCB(SELECT_USER_OPT)
            )