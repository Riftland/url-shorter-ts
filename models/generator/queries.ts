import { sql } from "slonik";
import { selectIdByEmail } from "../auth/queries";

export const insertUrl = (email: string, shortUrl: string, originUrl: string) => sql.unsafe`
    INSERT INTO links (
        short_url, origin_url, created_by
    ) VALUES (
        ${shortUrl}, ${originUrl},
        (${selectIdByEmail(email)})
    );
`;

export const selectOriginUrl = (shortUrl: string) => sql.unsafe`
    SELECT
        email,
        origin_url,
        uses_by_creator,
        uses
    FROM links
    INNER JOIN users
    ON users.id = links.created_by
    WHERE short_url LIKE ${shortUrl}
`;

export const updateStatsByShort = (shortUrl: string, { uses, usesByCreator }: { uses: number, usesByCreator: number }) => sql.unsafe`
    UPDATE links
    SET
        uses = ${uses},
        uses_by_creator = ${usesByCreator}
    WHERE short_url LIKE ${shortUrl}
`;

export const selectShortsByEmail = (email: string) => sql.unsafe`
    SELECT short_url, uses, uses_by_creator
    FROM users
    INNER JOIN links
    ON users.id = links.created_by
    WHERE email LIKE ${email}
`;
