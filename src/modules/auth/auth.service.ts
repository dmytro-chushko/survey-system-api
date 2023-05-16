import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { IAuthRes } from "./types/auth.types";
import { IUserPayload } from "../user/types/user.types";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	generateToken(userPayload: IUserPayload): string {
		return this.jwtService.sign(userPayload);
	}

	async loginUser(loginDto: LoginDto): Promise<IAuthRes> {
		const payload = await this.userService.findByLogin(loginDto);
		const token = this.generateToken(payload);

		return { token, role: payload.role };
	}
}
