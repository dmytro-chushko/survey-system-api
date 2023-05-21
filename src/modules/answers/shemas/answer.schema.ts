import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Category } from "src/modules/surveys/schemas/category.schema";
import { Question } from "src/modules/surveys/schemas/question.schema";
import { User } from "src/modules/user/schemas/user.schema";

@Schema()
export class Answer {
	@Prop({ type: String, required: true })
	answer: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true })
	question: Question;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true })
	category: Category;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
	user: User;
}
export const AnswerSchema = SchemaFactory.createForClass(Answer);
