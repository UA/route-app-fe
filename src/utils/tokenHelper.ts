import { IAuthRes } from "../models/authModel";
import { tokenKey, userKey } from "./constants";

export const getToken = (): string | null => {
    return localStorage.getItem(tokenKey);
};

export const setAccessToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
};

export const getUserData = (): IAuthRes | null => {
    const user = localStorage.getItem(userKey);
    if (user) {
      return JSON.parse(user);
    }
    return null;
};

export const setUserData = (user: IAuthRes) => {
    localStorage.setItem(userKey, JSON.stringify(user));
};
