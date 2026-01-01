import { NestFactory } from '@nestjs/core';
import { SeedDataService } from './seed.service';
import { SeedAppModule } from './seed.module';

export const Seed = async () => {
	try {
		const app = await NestFactory.create(SeedAppModule);
		await app.init();

		const seedDataService = app.get(SeedDataService);
		await seedDataService.executeSeed();

		await app.close();
		process.exit(0);
	} catch (error) {
		console.error('Seed update failed:', error);
		process.exit(1);
	}
};

(async () => {
	await Seed();
})();
