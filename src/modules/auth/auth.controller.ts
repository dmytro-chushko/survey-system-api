import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { IAuthRes } from "./types/auth.types";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	login(@Body() loginDto: LoginDto): Promise<IAuthRes> {
		return this.authService.loginUser(loginDto);
	}
}
