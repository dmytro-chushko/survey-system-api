import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Category } from "./category.schema";

@Schema()
export class Question {
	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] })
	category: Category;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);
