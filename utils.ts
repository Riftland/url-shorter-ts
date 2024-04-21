import { CatcherFn, DBError, UserPayload } from "./types";

export const log = (msg: string): void => console.info(msg);

// UserPayload no debería estar aquí. Crea dependencia directa con un tipo específico y limita el uso de esta util
export const catcher: CatcherFn<UserPayload, DBError> = async (successCB, failureCB) => {
    try {
        const { error_code, content } = (await successCB()) ?? {};
        return {
            ok: true,
            error_code,
            content,
        }
    } catch (error) {
        return {
            ok: false,
            message: failureCB(error as DBError)
        }
    }
}