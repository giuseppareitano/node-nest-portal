import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {AuthGuard} from "../auth/guards/auth.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {RoleEnum} from "../auth/enums/role.enum";
import {UserDto} from "./dto/user.dto";
import {User} from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
      const newUser = await this.usersService.create(createUserDto);
      return new UserDto(
          newUser.id,
          newUser.username,
          newUser.firstName,
          newUser.lastName,
          newUser.roles.map(r => r.name as RoleEnum)
      );
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<UserDto[]> {
      const users = await this.usersService.findAll();
      return users.map((newUser: User) => {
          return new UserDto(
              newUser.id,
              newUser.username,
              newUser.firstName,
              newUser.lastName,
              newUser.roles.map(r => r.name as RoleEnum)
          );
      });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number): Promise<UserDto | null> {
    const user = await this.usersService.findOneById(id);
    return user !== null ?
        new UserDto(
            user.id,
            user.username,
            user.firstName,
            user.lastName,
            user.roles.map(r => r.name as RoleEnum)
        )
        : null;
  }

  @Get(':username')
  @UseGuards(AuthGuard)
  async findByUsername(@Param('username') username: string): Promise<UserDto| null> {
    const user = await this.usersService.findOneByUsername(username);
    return user !== null ?
        new UserDto(
            user.id,
            user.username,
            user.firstName,
            user.lastName,
            user.roles.map(r => r.name as RoleEnum)
        )
        : null
  }


  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string): Promise<number> {
    return this.usersService.remove(+id);
  }
}
