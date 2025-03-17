import { ERoleNames } from "./ERoleNames";
import { IToken } from "./IToken";

export interface IUser {
    id: number;
    name?: string;
    email: string;
    password: string;
    role: ERoleNames;
    tokens: IToken[]
}

export type IPublicUser = Omit<IUser, "password">;

export type ITokenUser = Pick<IUser, "id" | "role">;