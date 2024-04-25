import { OK_STATUS, REDIRECTION_STATUS, URL_TOKEN_LEN, URL_TOKEN_POS_START } from "./constants";
import { ApiResponse, DbError, ErrorCodes, FailureCB, ModelResponse, SuccessCB } from "./types";
import { Response } from "express";

export const log = (msg: string): void => console.info(msg);

// --- Proposal for catcher ---
// export const catcher: CatcherFn = async (
//     successCB,
//     failureCB,
// ) => {
// ----------------------------

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
    <T>(res: Response) =>
        (data?: T | Record<string, T>, message?: string): void => {
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

export const genToken = (len = 8): string =>
    Math.random()
        .toString(36)
        .slice(URL_TOKEN_POS_START, URL_TOKEN_POS_START + URL_TOKEN_LEN);