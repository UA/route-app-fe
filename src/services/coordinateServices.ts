import { IUserCoordinateReq, IUserCoordinateRes } from "../models/coordinateModel";
import http from "../utils/http";

export const getCoordinates = async (userId:string): Promise<IUserCoordinateRes> => {
    return await http.get<null, IUserCoordinateRes>(`coordinates/${userId}`);
};
  
export const createCoordinate = async (param: IUserCoordinateReq) => {
    return http.post('coordinates', param);
};

export const editCoordinate = async (param: IUserCoordinateReq) => {
    return http.put(`coordinates`, param);
};

export const deleteCoordinate = (id: string) => {
    return http.delete(`coordinates/${id}`);
  };
  
  