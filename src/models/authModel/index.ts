export interface IAuthReq {
    email: string;
    password: string;
}

export interface IAuthRes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    role: string;
}

export type LoginFormValues = {
    email: string;
    password: string;
};
  