import { APP_GUARD } from '@nestjs/core';
import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { AuthGuard } from './auth.guard';

/**
 * Auth Module
 *
 * Handles authentication and authorization for the platform.
 *
 * TODO Phase-1:
 * - Implement JWT authentication strategy
 * - Add Passport strategies (JWT, Local)
 * - Create login/logout endpoints
 * - Implement refresh token logic
 * - Add password reset functionality
 */
@Module({
	imports: [],
	controllers: [],
	providers: [
		AuthMiddleware,
		// Global auth guard - all routes require authentication
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	exports: [],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
