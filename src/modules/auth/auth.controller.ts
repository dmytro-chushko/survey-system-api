import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { IAuthRes, ICustomRequest } from "./types/auth.types";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	login(@Body() loginDto: LoginDto): Promise<IAuthRes> {
		return this.authService.loginUser(loginDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	getUser(@Req() req: ICustomRequest) {
		return req.user;
	}
}
