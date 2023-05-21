import { HttpException, Injectable } from "@nestjs/common";
import { Answer } from "./shemas/answer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAnswer } from "src/types/answer.types";
import { AnswerDto } from "./dto/answer.dto";
import { SurveysService } from "../surveys/surveys.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AnswersService {
	constructor(
		@InjectModel(Answer.name) private answerModel: Model<IAnswer>,
		private readonly surveysService: SurveysService,
		private readonly userService: UserService,
	) {}

	async createAnswer(answerDto: AnswerDto): Promise<IAnswer> {
		try {
			const { answer, questionId, categoryId, userEmail } = answerDto;
			const question = await this.surveysService.getQuestionById(questionId);
			const category = await this.surveysService.getCategoryById(categoryId);
			const user = await this.userService.findByEmail(userEmail);
			const newAnswer = new this.answerModel({ answer, question, category, user });

			await newAnswer.save();

			return newAnswer;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
