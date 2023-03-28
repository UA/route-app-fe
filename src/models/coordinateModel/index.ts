import { LatLng } from "leaflet";

export type UserCoordinateFormValues = {
    userId: string;
    coordinates: LatLng[];
};

export interface IUserCoordinateRes {
    id: string;
    userId: string;
    coordinates: LatLng[];
}

export interface IUserCoordinateReq {
    userId: string;
    coordinates: LatLng[];
}
