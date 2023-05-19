import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { CategoryDto } from "./dto/category.dto";
import { ICategory, IQuestion } from "src/types/survey.types";
import { QuestionDto } from "./dto/question.dto";
import { ROUTE_KEYS } from "src/utils/consts";

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
	getCategories(): Promise<ICategory[]> {
		return this.surveysService.getCategories();
	}

	@Get(`${ROUTE_KEYS.CATEGORIES}/:id`)
	getCategoryById(@Param("id") id: string): Promise<ICategory> {
		return this.surveysService.getCategoryById(id);
	}
}
