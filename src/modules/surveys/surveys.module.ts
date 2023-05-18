import { Module } from "@nestjs/common";
import { SurveysController } from "./surveys.controller";
import { SurveysService } from "./surveys.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Category, CategorySchema } from "./schemas/category.schema";
import { Question, QuestionSchema } from "./schemas/question.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Category.name, schema: CategorySchema },
			{ name: Question.name, schema: QuestionSchema },
		]),
	],
	controllers: [SurveysController],
	providers: [SurveysService],
})
export class SurveysModule {}
