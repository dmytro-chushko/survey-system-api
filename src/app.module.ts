import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
