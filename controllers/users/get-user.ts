import { OK_STATUS } from "../../constants";
import { ControllersMiddleware } from "../../types";
import { setResponse } from "../../utils";

export const getUser: ControllersMiddleware = () => async (_, res, __) => {
  const { user } = res.locals;

  // res.status(200).json({
  //   success: true,
  //   data: {
  //     username: user.username,
  //   }
  // });

  setResponse(res.status(OK_STATUS))({ username: user.username })
};
