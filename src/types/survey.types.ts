import { Document } from "mongoose";

export interface ICategory extends Document {
	title: string;
	questions: string[];
	interviewedUsers: string[];
}

export interface IQuestion extends Document {
	content: string;
	answers: string[];
	category: string;
}
