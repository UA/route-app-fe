import { IAuthReq, IAuthRes } from "../models/authModel";
import http from "../utils/http";

export const authenticate = async (param: IAuthReq): Promise<IAuthRes> => {
    return await http.post<null, IAuthRes>(
      "auth/login",
      param
    );
  };
  