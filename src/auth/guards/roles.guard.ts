import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from "../decorators/roles.decorator";
import {RoleEnum} from "../enums/role.enum";
import {UtilsService} from "../utils/utils.service";
import {UserDto} from "../../users/dto/user.dto";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private utilsService: UtilsService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        try {
            const userClaims = await this.utilsService.getJwtClaimsFromRequest(context) as Partial<UserDto>;
            return requiredRoles.some((role) => userClaims.roles?.includes(role));
        } catch {
            throw new UnauthorizedException();
        }
    }
}
