import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class QuestionDto {
	@IsString()
	@MaxLength(100)
	@IsNotEmpty()
	readonly question: string;

	@IsArray()
	@IsNotEmpty()
	readonly answers: string[];

	@IsString()
	@MaxLength(50)
	@IsNotEmpty()
	readonly categoryId: string;
}
