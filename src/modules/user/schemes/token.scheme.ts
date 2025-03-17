import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ETokenType, IToken } from "src/interfaces/IToken";
import { User } from "./user.scheme";

@Entity({
    name: "tokens"
})
export class Token implements IToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid" })
    token: string;

    @Column({ type: "datetime", name: "expires_in", nullable: true })
    expiresIn: Date | null;

    @Column({ type: "enum", enum: ETokenType })
    type: ETokenType;

    @ManyToOne(() => User, user => user.tokens, {
        orphanedRowAction: "delete"
    })
    @JoinColumn({ name: "user_id" })
    user: User
}