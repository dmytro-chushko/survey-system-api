import { Document } from "mongoose";

export interface IAnswer extends Document {
	answer: string;
	question: string;
	category: string;
	user: string;
}

export interface ISubmitedAnswers {
	answers: Record<string, string>;
	categoryId: string;
	userEmail: string;
}
