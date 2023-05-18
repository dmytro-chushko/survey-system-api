import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { USER_ROLE } from "../../../types/user.types";

@Schema()
export class User {
	@Prop({ type: String, required: true, unique: true })
	email: string;

	@Prop()
	password: string;

	@Prop({ enum: USER_ROLE, required: true })
	role: USER_ROLE;

	@Prop({ type: [String], default: [] })
	passedCategories: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
