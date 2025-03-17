import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ERoleNames } from "src/interfaces/ERoleNames";
import { IUser } from "src/interfaces/IUser";
import { Token } from "./token.scheme";

@Entity({
    name: "users"
})
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 18, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "enum", enum: ERoleNames })
    role: ERoleNames;

    @OneToMany(() => Token, token => token.user, { cascade: ["remove", "insert", "update"] })
    @JoinColumn()
    tokens: Token[]
}