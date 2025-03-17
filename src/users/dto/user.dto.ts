import {RoleEnum} from "../../auth/enums/role.enum";

export class UserDto {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roles: RoleEnum[];

    constructor(id: number, username: string, firstName:string, lastName: string, roles: RoleEnum[] = []) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }
}
