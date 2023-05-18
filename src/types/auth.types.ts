import { IUser, USER_ROLE } from "src/types/user.types";

export interface IAuthRes {
	token: string;
	role: USER_ROLE;
}

export interface ICustomRequest extends Request {
	user: IUser;
}
