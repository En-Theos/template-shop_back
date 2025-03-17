import { IUser } from "./IUser"

export enum ETokenType {
    RESET_PASSWORD="reset_password"
}

export interface IToken {
    id: number,
    token: string,
    type: ETokenType,
    expiresIn: Date | null,
    user: IUser
}