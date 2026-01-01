import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptors';
import { HttpExceptionFilter } from './core/filters';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Global interceptors (for response transformation)
	app.useGlobalInterceptors(new TransformInterceptor());

	// Global filters (for error handling)
	app.useGlobalFilters(new HttpExceptionFilter());

	// Global validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidUnknownValues: true,
		}),
	);

	// CORS
	app.enableCors({
		origin: process.env.CORS_ORIGIN || '*',
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
	});

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Multi-Tenant API')
		.setDescription('Multi-tenant SaaS platform API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const port = parseInt(process.env.API_PORT || '5000', 10);
	await app.listen(port);

	console.log(`🚀 API running on http://localhost:${port}`);
	console.log(`📚 Swagger docs at http://localhost:${port}/api`);
}

bootstrap();
