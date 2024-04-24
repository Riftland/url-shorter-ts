import { OK_STATUS, REDIRECTION_STATUS } from "./constants";
import { ApiResponse, DbError, ErrorCodes, FailureCB, ModelResponse, SuccessCB } from "./types";
import { Response } from "express";

export const log = (msg: string): void => console.info(msg);

// --- Proposal ---
// export const catcher: CatcherFn = async (
//     successCB,
//     failureCB,
// ) => {
// ----------------

export const catcher = async <T, U>(
    successCB: SuccessCB<T>,
    failureCB: FailureCB<U>
): Promise<ModelResponse<T>> => {
    try {
        const { content } = (await successCB()) ?? {};
        return {
            ok: true,
            content,
        }
    } catch (error) {
        return {
            ok: false,
            message: failureCB(error as U)
        }
    }
};

export const nonOk = (errorCode = ErrorCodes.NO_ERROR): ModelResponse<undefined> => ({
    ok: false,
    error_code: errorCode,
});

export const stdErrCB = (optPrefix = '') => (error: DbError) => {
    const { message = '' } = error;
    log(`> ${optPrefix} ${message}`);

    return message;
};

export const setContent = <T>(payload: T) => ({
    content: payload,
});

export const extract =
    <T, U extends keyof T>(...props: U[]) =>
        (origin: T): Pick<T, U> => {
            const result = {} as Pick<T, U>;
            for (const prop of props) (result[prop] = origin[prop])

            return result;
        }

export const setResponse =
    (res: Response) =>
        (data?: Record<string, string | number>, message?: string): void => {
            res.json({
                success: res.statusCode === OK_STATUS,
                data,
                message,
            } as ApiResponse)
        }

export const setRedirect =
    (res: Response) =>
        (destinationUrl: string): void => {
            res.redirect(REDIRECTION_STATUS, destinationUrl);
        }