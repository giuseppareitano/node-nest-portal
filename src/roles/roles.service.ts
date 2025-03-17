import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {In, Repository} from "typeorm";
import {Role} from "./role.entity";
import {RoleEnum} from "../auth/enums/role.enum";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async findAllByName(roles: RoleEnum[]): Promise<Role[]> {
        return this.rolesRepository.find({
            where: {
                name: In(roles),
            },
        });
    }

}
