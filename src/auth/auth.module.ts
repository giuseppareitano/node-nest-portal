import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from "./utils/constants";
import {UtilsService} from "./utils/utils.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '86400s'}, //24h
        })
        , UsersModule],
    controllers: [AuthController],
    providers: [AuthService, UtilsService],
    exports: [UtilsService]
})
export class AuthModule {
}
