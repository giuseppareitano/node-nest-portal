import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserDto} from "../users/dto/user.dto";
import {RoleEnum} from "./enums/role.enum";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private readonly jwtService: JwtService) {
    }

    async signIn(username: string, pass: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneByUsername(username);
        if (user == null) {
            throw new UnauthorizedException();
        }
        const isPasswordValid = await bcrypt.compare(pass, user.hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generiamo il payload per il JWT
        const payload: Partial<UserDto> = {username: user.username, id: user.id, roles: user.roles.map(r => r.name as RoleEnum)};

        // Restituiamo il token JWT
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto): Promise<UserDto> {
        const existingUser = await this.usersService.findOneByUsername(createUserDto.username);

        if(!!existingUser){
            throw new HttpException("Username already exists", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        // Hash della password
        const salt = await bcrypt.genSalt(10);

        // Creazione dell'utente nel DB
        createUserDto.hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const newUser = await this.usersService.create(createUserDto)
        return new UserDto(
            newUser.id,
            newUser.username,
            newUser.firstName,
            newUser.lastName,
            newUser.roles.map(r => r.name as RoleEnum)
        );
    }

}
