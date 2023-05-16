import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@MaxLength(16)
	@MinLength(6)
	@IsNotEmpty()
	readonly password: string;
}
