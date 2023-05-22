import { Document } from "mongoose";

export enum USER_ROLE {
	ADMIN = "admin",
	GUEST = "guest",
}

export interface IUser extends Document {
	email: string;
	password: string;
	role: USER_ROLE;
	passedCategories: string[];
}

export interface IUserPayload {
	id: string;
	email: string;
	role: USER_ROLE;
}

export interface IUserInfo {
	_id: string;
	email: string;
	role: USER_ROLE;
}
