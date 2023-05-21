import { Module } from "@nestjs/common";
import { SurveysController } from "./surveys.controller";
import { SurveysService } from "./surveys.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schemas/category.schema";
import { Question, QuestionSchema } from "./schemas/question.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Category.name, schema: CategorySchema },
			{ name: Question.name, schema: QuestionSchema },
		]),
	],
	controllers: [SurveysController],
	providers: [SurveysService],
	exports: [SurveysService],
})
export class SurveysModule {}
