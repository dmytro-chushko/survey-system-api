import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schemas/category.schema";
import { Model } from "mongoose";
import { ICategory, IQuestion } from "src/types/survey.types";
import { Question } from "./schemas/question.schema";
import { CategoryDto } from "./dto/category.dto";
import { QuestionDto } from "./dto/question.dto";

@Injectable()
export class SurveysService {
	constructor(
		@InjectModel(Category.name) private categoryModel: Model<ICategory>,
		@InjectModel(Question.name) private questionModel: Model<IQuestion>,
	) {}

	async createCategory(categoryDto: CategoryDto): Promise<ICategory> {
		try {
			const { title } = categoryDto;
			const category = await this.categoryModel.findOne({ title });
			if (category) {
				throw new HttpException("category with this title already exists", HttpStatus.BAD_REQUEST);
			}
			const newCategory = new this.categoryModel(categoryDto);

			await newCategory.save();

			return newCategory;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async createQuestion(questionDto: QuestionDto): Promise<IQuestion> {
		try {
			const { question, answers, categoryId } = questionDto;
			const category = await this.getCategoryById(categoryId);
			if (!category) {
				throw new HttpException("invalid category id", HttpStatus.BAD_REQUEST);
			}
			const newQuestion = new this.questionModel({ question, answers, category });

			category.questions.push(newQuestion.id);
			await category.save();
			await newQuestion.save();

			return newQuestion;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getCategories(): Promise<ICategory[]> {
		try {
			const categories = await this.categoryModel.find({}, null, { select: "-questions" });

			return categories;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getCategoryById(id: string): Promise<ICategory> {
		try {
			const category = await this.categoryModel
				.findById(id)
				.populate({ path: "questions", select: "-category" });

			return category;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getQuestions(): Promise<IQuestion[]> {
		try {
			const questions = await this.questionModel.find();

			return questions;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
