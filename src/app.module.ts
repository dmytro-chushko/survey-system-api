import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { SurveysModule } from "./modules/surveys/surveys.module";
import { AnswersModule } from "./modules/answers/answers.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UserModule,
		AuthModule,
		SurveysModule,
		AnswersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
