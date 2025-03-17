import { ERoleNames } from "src/interfaces/ERoleNames";
import { IPublicUser, IUser } from "src/interfaces/IUser";
import * as bcrypt from "bcrypt";
import { IToken } from "src/interfaces/IToken";

export class UserEntity {
    private id: number;
    private name?: string;
    private email: string;
    private password: string;
    private role: ERoleNames;
    private tokens: IToken[]

    constructor(userRepo: IUser) {
        this.id = userRepo.id;
        this.name = userRepo.name;
        this.email = userRepo.email;
        this.password = userRepo.password;
        this.role = userRepo.role;
        this.tokens = userRepo.tokens
    }

    public getPublicUser(): IPublicUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            tokens: this.tokens
        };
    }

    public getUser(): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            tokens: this.tokens
        };
    }

    public addToken(token: IToken) {
        if (this.tokens) {
            this.tokens = this.tokens.filter(item => item.type !== token.type);
            this.tokens.push(token)
        } else {
            this.tokens = [token]
        }
    }

    public updateInfo(data: Pick<IUser, "name" | "email">): this {
        this.name = data.name;
        this.email = data.email;

        return this
    }

    public static async hashPassword(password: IUser["password"]): Promise<IUser["password"]> {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password, salt);
    }

    public static async validatePassword(passwordFromReq: IUser["password"], passwordFromDB: IUser["password"]): Promise<boolean> {
        return await bcrypt.compare(passwordFromReq, passwordFromDB)
    }
}