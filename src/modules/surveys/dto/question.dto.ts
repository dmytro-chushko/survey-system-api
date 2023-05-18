import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class QuestionDto {
	@IsString()
	@MaxLength(100)
	@IsNotEmpty()
	readonly content: string;

	@IsString()
	@MaxLength(50)
	@IsNotEmpty()
	readonly categoryId: string;
}
