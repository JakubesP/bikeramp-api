import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TripsModule,
    StatsModule,
    GoogleMapsModule,
  ],
})
export class AppModule {
  static port: number;

  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
}
