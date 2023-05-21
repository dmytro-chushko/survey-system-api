import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ROUTE_KEYS } from "src/utils/consts";
import { AnswersService } from "./answers.service";
import { Roles } from "../auth/decorators/role.decorator";
import { USER_ROLE } from "src/types/user.types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { ISubmitedAnswers } from "src/types/answer.types";

@Controller(ROUTE_KEYS.ANSWERS)
export class AnswersController {
	constructor(private readonly answersService: AnswersService) {}

	@Post()
	@Roles(USER_ROLE.GUEST)
	@UseGuards(JwtAuthGuard, RolesGuard)
	submitSurvey(@Body() submitedAnswers: ISubmitedAnswers): { message: string } {
		const { answers, categoryId, userEmail } = submitedAnswers;
		Object.keys(answers).map(questionId =>
			this.answersService.createAnswer({
				answer: answers[questionId],
				questionId,
				categoryId,
				userEmail,
			}),
		);
		return { message: "Survey has been submited" };
	}
}
