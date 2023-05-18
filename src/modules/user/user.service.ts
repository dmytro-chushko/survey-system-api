import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt";
import { IUser, IUserPayload } from "./types/user.types";
import { User } from "./schemas/user.schema";
import { UserDto } from "./dto/user.dto";
import { LoginDto } from "../auth/dto/login.dto";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

	private sanitizeUser(user: IUser): Omit<IUser, "password"> {
		const sanitized = user.toObject<IUser>();
		delete sanitized["password"];
		return sanitized;
	}

	async createUser(userDto: UserDto): Promise<Omit<IUser, "password">> {
		try {
			const { email, password } = userDto;
			const user = await this.findByEmail(email);
			if (user) {
				throw new HttpException("user already exists", HttpStatus.BAD_REQUEST);
			}
			const hashedPassword = await hash(password, 10);
			const createdUser = new this.userModel({ ...userDto, password: hashedPassword });

			await createdUser.save();

			return this.sanitizeUser(createdUser);
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async findByLogin(loginDto: LoginDto): Promise<IUserPayload> {
		try {
			const { email, password } = loginDto;
			const user = await this.findByEmail(email);
			if (!user) {
				throw new HttpException("user doesnt exists", HttpStatus.BAD_REQUEST);
			}
			const isPasswordValid = await compare(password, user.password);
			if (!isPasswordValid) {
				throw new HttpException("invalid credential", HttpStatus.BAD_REQUEST);
			}

			return { id: user.id, email: user.email, role: user.role };
		} catch (error) {
			throw new HttpException(`${error.response}`, error.status);
		}
	}

	async findByEmail(email: string): Promise<IUser> {
		try {
			const user = await this.userModel.findOne({ email });

			return user;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
