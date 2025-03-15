import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {SignInDto} from "./dto/sign-in.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserDto} from "../users/dto/user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto): Promise<{accessToken: string}> {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('register')
    async signUp(
        @Body() createUserDto: CreateUserDto
    ): Promise<UserDto> {
        return this.authService.signUp(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
