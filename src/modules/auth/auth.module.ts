import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot(),
		JwtModule.register({
			secret: process.env.SECRET_KEY || "SECRET_KEY",
			signOptions: {
				expiresIn: process.env.EXPIRES_IN || "24h",
			},
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
