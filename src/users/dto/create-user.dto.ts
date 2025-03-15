export interface CreateUserDto {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    hashedPassword: string;
}
