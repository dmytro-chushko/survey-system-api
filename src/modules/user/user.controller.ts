import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { IUser, IUserInfo } from "./types/user.types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ICustomRequest } from "../auth/types/auth.types";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() userDto: UserDto): Promise<Omit<IUser, "password">> {
		return this.userService.createUser(userDto);
	}

	@Get("info")
	@UseGuards(JwtAuthGuard)
	async getUserInfo(@Res() res: ICustomRequest): Promise<IUserInfo> {
		const { email, role } = await this.userService.findByEmail(res.user.email);

		return { email, role };
	}
}
