import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";

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
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
