import { IUserReq, IUserRes } from "../models/userModel";
import http from "../utils/http";

export const getUsers = async (): Promise<IUserRes[]> => {
    return await http.get<null, IUserRes[]>("users");
};
  
export const createUser = async (param: IUserReq): Promise<IUserRes> => {
    return http.post('users', param);
};

export const editUser = async (param: IUserReq) => {
    return http.put(`users`, param);
};

export const deleteUser = (userId: string) => {
    return http.delete(`users/${userId}`);
};
  
  