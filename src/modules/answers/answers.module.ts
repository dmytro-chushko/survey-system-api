import { Module } from "@nestjs/common";
import { AnswersController } from "./answers.controller";
import { AnswersService } from "./answers.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./shemas/answer.schema";
import { SurveysModule } from "../surveys/surveys.module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
		SurveysModule,
	],
	controllers: [AnswersController],
	providers: [AnswersService],
})
export class AnswersModule {}
