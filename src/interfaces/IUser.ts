import { ERoleNames } from "./ERoleNames";

export interface IUser {
    id: number;
    name?: string;
    email: string;
    password: string;
    role: ERoleNames;
}

export type IPublicUser = Omit<IUser, "password">;

export type ITokenUser = Pick<IUser, "id" | "role">;