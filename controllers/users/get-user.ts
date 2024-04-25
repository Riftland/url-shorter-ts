import { OK_STATUS } from "../../constants";
import { ControllersMiddleware } from "../../types";
import { setResponse } from "../../utils";

export const getUser: ControllersMiddleware = () => async (_, res, __) => {
  const { user } = res.locals;

  setResponse<string>(
    res.status(OK_STATUS)
  )({ username: user.username })
};
