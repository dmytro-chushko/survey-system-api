import { IsNotEmpty, IsString } from "class-validator";
import { ICategory } from "src/types/survey.types";
import { IUser } from "src/types/user.types";

export class AnswerDto {
	@IsString()
	@IsNotEmpty()
	readonly answer: string;

	@IsString()
	@IsNotEmpty()
	readonly questionId: string;

	@IsString()
	@IsNotEmpty()
	readonly category: ICategory;

	@IsString()
	@IsNotEmpty()
	readonly user: IUser;
}
