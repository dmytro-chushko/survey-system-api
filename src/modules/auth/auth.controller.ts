import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { IAuthRes, ICustomRequest } from "./types/auth.types";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/role.guard";
import { Roles } from "./decorators/role.decorator";
import { USER_ROLE } from "../user/types/user.types";
import { ROUTE_KEYS } from "src/utils/consts";

@Controller(ROUTE_KEYS.AUTH)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(ROUTE_KEYS.LOGIN)
	login(@Body() loginDto: LoginDto): Promise<IAuthRes> {
		return this.authService.loginUser(loginDto);
	}

	@Get()
	@Roles(USER_ROLE.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	getUser(@Req() req: ICustomRequest) {
		return req.user;
	}
}
