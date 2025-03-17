import {RoleEnum} from "../../auth/enums/role.enum";

export interface CreateUserDto {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    hashedPassword?: string;
    roles?: RoleEnum[];
}
