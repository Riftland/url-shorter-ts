import { sql } from "slonik";

export const insertUser = (email: string, username: string, password: string) => sql.unsafe`
    INSERT INTO users (
        email, username, password
    ) VALUES (
        ${email}, ${username}, ${password}
    )
`;

export const selectByEmail = (email: string) => sql.unsafe`
    SELECT email, username, password
    FROM users
    WHERE email LIKE ${email}
`;

export const selectIdByEmail = (email: string) => sql.unsafe`
    SELECT id
    FROM users
    WHERE email LIKE ${email}
`;