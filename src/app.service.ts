import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigurationService } from './config/config';

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(
		private readonly configService: ConfigurationService,
	) {}

	async ping(): Promise<void> {
		console.log('AppService ping');
	}

	async onApplicationBootstrap(): Promise<void> {
		// Seed DB with default data, if it's empty
		// await this.seedDataService.executeSeed();

		if (!this.configService.isProduction()) {
			console.log(
				'AppService onApplicationBootstrap run one time on app start',
			);
		}
	}
}
