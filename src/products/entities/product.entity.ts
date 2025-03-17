import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    code: string;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
