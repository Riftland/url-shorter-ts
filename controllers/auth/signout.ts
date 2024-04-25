import { cookie } from "simple-stateless-auth-library-ts"
import { ControllersMiddleware } from "../../types";
import { setResponse } from "../../utils";
import { OK_STATUS } from "../../constants";

export const signout: ControllersMiddleware = () => async (_, res) => {
    cookie.clear(res);

    setResponse<undefined>(
        res.status(OK_STATUS)
    )();
}