import { cookie } from "simple-stateless-auth-library-ts"
import { ControllersMiddleware } from "../../types";

export const signout: ControllersMiddleware = () => async (_, res) => {
    cookie.clear(res);

    res.status(200).json({
        success: true,
    })
}