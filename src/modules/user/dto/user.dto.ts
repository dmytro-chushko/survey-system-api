import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { USER_ROLE } from "../../../types/user.types";

export class UserDto {
	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@MaxLength(50)
	@MinLength(6)
	@IsNotEmpty()
	readonly password: string;

	@IsEnum(USER_ROLE)
	@IsNotEmpty()
	readonly role: USER_ROLE;
}
