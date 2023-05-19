import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { IUser, IUserInfo } from "../../types/user.types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ICustomRequest } from "../../types/auth.types";
import { ROUTE_KEYS } from "src/utils/consts";

@Controller(ROUTE_KEYS.USER)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() userDto: UserDto): Promise<Omit<IUser, "password">> {
		return this.userService.createUser(userDto);
	}

	@Get(ROUTE_KEYS.INFO)
	@UseGuards(JwtAuthGuard)
	async getUserInfo(@Req() req: ICustomRequest): Promise<IUserInfo> {
		const { email, role } = await this.userService.findByEmail(req.user.email);

		return { email, role };
	}
}
