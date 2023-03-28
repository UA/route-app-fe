export interface IUserRes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface IUserReq {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}
  
export type UserFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: boolean;
};