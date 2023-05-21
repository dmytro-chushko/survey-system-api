import { IsNotEmpty, IsString } from "class-validator";

export class AnswerDto {
	@IsString()
	@IsNotEmpty()
	readonly answer: string;

	@IsString()
	@IsNotEmpty()
	readonly questionId: string;

	@IsString()
	@IsNotEmpty()
	readonly categoryId: string;

	@IsString()
	@IsNotEmpty()
	readonly userEmail: string;
}
