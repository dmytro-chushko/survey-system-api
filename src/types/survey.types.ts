import { Document } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";

export interface ICategory extends Document {
	title: string;
	questions: string[];
	interviewedUsers: User[];
}

export interface IQuestion extends Document {
	content: string;
	answers: string[];
	category: string;
}
