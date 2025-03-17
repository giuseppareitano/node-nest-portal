import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {UtilsService} from "../utils/utils.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private utilsService: UtilsService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            this.utilsService.getJwtClaimsFromRequest(context);
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
