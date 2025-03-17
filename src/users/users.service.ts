import {BadRequestException, ConflictException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(
        private rolesService: RolesService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;

        if (!createUserDto.hashedPassword) {
            throw new BadRequestException("User password not specified");
        }
        user.hashedPassword = createUserDto.hashedPassword;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        if (createUserDto.roles?.length) {
            user.roles = await this.rolesService.findAllByName(createUserDto.roles);
            if (user.roles.length != createUserDto.roles.length) {
                throw new BadRequestException("Invalid roles in request");
            }
        }
        return this.usersRepository.save(
            this.usersRepository.create(user)
        );
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async findOneById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {id},
            relations: ['roles'],
        })
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {username},
            relations: ['roles'],
        });
    }

    async remove(id: number): Promise<number> {
        const result = await this.usersRepository.delete(id);
        return result.affected || 0;
    }
}
