import { Body, Controller, Post } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { CategoryDto } from "./dto/category.dto";
import { ICategory, IQuestion } from "src/types/survey.types";
import { QuestionDto } from "./dto/question.dto";

@Controller("surveys")
export class SurveysController {
	constructor(private readonly surveysService: SurveysService) {}

	@Post("category")
	createCategory(@Body() categoryDto: CategoryDto): Promise<ICategory> {
		return this.surveysService.createCategory(categoryDto);
	}

	@Post("question")
	createQuestion(@Body() questionDto: QuestionDto): Promise<IQuestion> {
		return this.surveysService.createQuestion(questionDto);
	}
}
