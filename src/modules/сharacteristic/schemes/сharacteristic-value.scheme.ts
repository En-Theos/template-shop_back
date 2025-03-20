import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Characteristic } from "./сharacteristic.scheme";
import { Product } from "src/modules/product/schemes/product.scheme";

@Entity({ name: "characteristic_values" })
export class CharacteristicValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @ManyToOne(() => Characteristic, characteristic => characteristic.values)
    @JoinColumn({ name: "characteristic_id" })
    characteristic: Characteristic;

    @ManyToMany(() => Product)
    products: Product[]
} 