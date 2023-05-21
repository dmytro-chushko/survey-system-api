import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { CategoryDto } from "./dto/category.dto";
import { ICategory, IQuestion } from "src/types/survey.types";
import { QuestionDto } from "./dto/question.dto";
import { ROUTE_KEYS } from "src/utils/consts";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller(ROUTE_KEYS.SURVEYS)
export class SurveysController {
	constructor(private readonly surveysService: SurveysService) {}

	@Post(ROUTE_KEYS.CATEGORIES)
	createCategory(@Body() categoryDto: CategoryDto): Promise<ICategory> {
		return this.surveysService.createCategory(categoryDto);
	}

	@Post(ROUTE_KEYS.QUESTIONS)
	createQuestion(@Body() questionDto: QuestionDto): Promise<IQuestion> {
		return this.surveysService.createQuestion(questionDto);
	}

	@Get(ROUTE_KEYS.CATEGORIES)
	@UseGuards(JwtAuthGuard)
	getCategories(): Promise<ICategory[]> {
		return this.surveysService.getCategories();
	}

	@Get(`${ROUTE_KEYS.CATEGORIES}/:id`)
	@UseGuards(JwtAuthGuard)
	getCategoryById(@Param("id") id: string): Promise<ICategory> {
		return this.surveysService.getCategoryById(id);
	}

	@Get(ROUTE_KEYS.QUESTIONS)
	@UseGuards(JwtAuthGuard)
	getQuestions(): Promise<IQuestion[]> {
		return this.surveysService.getQuestions();
	}
}
