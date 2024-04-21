import { insertUser } from "./queries";
import { DbPool } from "../../types";
import { catcher, log } from "../../utils";

export const createUser = (db: DbPool) => async (email: string, username: string, password: string) => {
    return catcher(
        async () => {
            await db.query(insertUser(email, username, password));
        },
        (error) => {
            log(`> create user error: ${error.message}`);
            return error.message
        }
    )
}