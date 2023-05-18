import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CategoryDto {
	@IsString()
	@MaxLength(50)
	@IsNotEmpty()
	readonly title: string;
}
