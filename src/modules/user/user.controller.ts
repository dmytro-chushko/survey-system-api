import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { IUser } from "./types/user.types";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() userDto: UserDto): Promise<Omit<IUser, "password">> {
		return this.userService.createUser(userDto);
	}
}
