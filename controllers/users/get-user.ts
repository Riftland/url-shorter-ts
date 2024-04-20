import { ControllersMiddleware } from "../../types";

export const getUser: ControllersMiddleware = () => async (_, res, __) => {
  res.status(200).json({
    success: true,
  });
};
