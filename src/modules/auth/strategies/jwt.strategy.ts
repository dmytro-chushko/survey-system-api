import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { IUser, IUserPayload } from "src/types/user.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY,
		});
	}

	async validate(payload: IUserPayload): Promise<IUser> {
		try {
			const user = await this.userService.findByEmail(payload.email);
			if (!user) {
				throw new UnauthorizedException();
			}

			return user;
		} catch (error) {
			throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
