import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ROUTE_KEYS } from "src/utils/consts";
import { AnswersService } from "./answers.service";
import { Roles } from "../auth/decorators/role.decorator";
import { USER_ROLE } from "src/types/user.types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { IAnswer, ISubmitedAnswers } from "src/types/answer.types";
import { ICustomRequest } from "src/types/auth.types";
import { SurveysService } from "../surveys/surveys.service";

@Controller(ROUTE_KEYS.ANSWERS)
export class AnswersController {
	constructor(
		private readonly answersService: AnswersService,
		private readonly surveysService: SurveysService,
	) {}

	@Post()
	@Roles(USER_ROLE.GUEST)
	@UseGuards(JwtAuthGuard, RolesGuard)
	async submitSurvey(
		@Body() submitedAnswers: ISubmitedAnswers,
		@Req() req: ICustomRequest,
	): Promise<{ message: string }> {
		const { answers, categoryId } = submitedAnswers;
		const { user } = req;
		const category = await this.surveysService.addInterviewedUser(user, categoryId);
		Object.keys(answers).map(questionId =>
			this.answersService.createAnswer({
				answer: answers[questionId],
				questionId,
				category,
				user,
			}),
		);
		return { message: "Survey has been submited" };
	}

	@Get(":id")
	@Roles(USER_ROLE.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	getAnswersByCategory(@Param("id") categoryId: string): Promise<IAnswer[]> {
		return this.answersService.getAnswersByCategory(categoryId);
	}
}
