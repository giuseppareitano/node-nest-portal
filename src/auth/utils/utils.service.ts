import {Request} from "express";
import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {jwtConstants} from "./constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UtilsService {
    constructor(private jwtService: JwtService){}

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }



    getJwtClaimsFromRequest(context: ExecutionContext): unknown {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        const payload = this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        return payload;
    }
}