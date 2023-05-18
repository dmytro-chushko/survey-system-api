import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";
import { Question } from "./question.schema";

@Schema()
export class Category {
	@Prop({ type: String, required: true, unique: true })
	title: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], default: [] })
	questions: Question[];

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] })
	interviewedUsers: User[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
