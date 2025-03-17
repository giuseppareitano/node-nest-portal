import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolesModule} from "../roles/roles.module";
import {UtilsService} from "../auth/utils/utils.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UtilsService],
  exports: [UsersService]
})
export class UsersModule {}
