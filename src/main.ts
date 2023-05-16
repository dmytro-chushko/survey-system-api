import { NestFactory } from "@nestjs/core";
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
	try {
		const PORT = process.env.PORT || 4200;
		const app = await NestFactory.create(AppModule, { cors: true });

		app.useGlobalPipes(new ValidationPipe());

		return await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (error) {
		throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
bootstrap();
