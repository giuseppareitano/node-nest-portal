import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {Role} from "../roles/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column({unique:true})
    username: string;

    @Column({name: "hashed_password"})
    hashedPassword: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(
        () => Role)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'fk_user',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'fk_role',
            referencedColumnName: 'id',
        },
    })
    roles!: Role[]
}