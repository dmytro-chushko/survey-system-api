import { HttpException, Injectable } from "@nestjs/common";
import { Answer } from "./shemas/answer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAnswer } from "src/types/answer.types";
import { AnswerDto } from "./dto/answer.dto";
import { SurveysService } from "../surveys/surveys.service";

@Injectable()
export class AnswersService {
	constructor(
		@InjectModel(Answer.name) private answerModel: Model<IAnswer>,
		private readonly surveysService: SurveysService,
	) {}

	async createAnswer(answerDto: AnswerDto): Promise<IAnswer> {
		try {
			const { answer, questionId, category, user } = answerDto;
			const question = await this.surveysService.getQuestionById(questionId);
			const newAnswer = new this.answerModel({ answer, question, category, user });

			await newAnswer.save();

			return newAnswer;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getAnswersByCategory(categoryId: string): Promise<IAnswer[]> {
		try {
			const answers = await this.answerModel.find().where({ category: categoryId });

			return answers;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
