import { ERoleNames } from "src/interfaces/ERoleNames";
import { IPublicUser, IUser } from "src/interfaces/IUser";
import * as bcrypt from "bcrypt";

export class UserEntity {
    private id: number;
    private name?: string;
    private email: string;
    private password: string;
    private role: ERoleNames;

    constructor(userRepo: IUser) {
        this.id = userRepo.id;
        this.name = userRepo.name;
        this.email = userRepo.email;
        this.password = userRepo.password;
        this.role = userRepo.role;
    }

    public getPublicUser(): IPublicUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
        };
    }

    public getUser(): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
        };
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