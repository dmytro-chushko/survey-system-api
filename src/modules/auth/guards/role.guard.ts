import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { USER_ROLE } from "src/types/user.types";
import { ROLES_KEY } from "src/utils/consts";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRole = this.reflector.getAllAndOverride<USER_ROLE>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRole) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();

		return requiredRole === user.role;
	}
}
