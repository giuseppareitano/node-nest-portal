import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column()
    username: string;

    @Column({name: "hashed_password"})
    hashedPassword: string;

    @Column({ default: true })
    isActive: boolean;
}