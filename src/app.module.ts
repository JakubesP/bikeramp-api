import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TripsModule } from './trips/trips.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { AllExceptionsFilter } from './core/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { RoadDistanceModule } from './road-distance/road-distance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TripsModule,
    GoogleMapsModule,
    RoadDistanceModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  static port: number;

  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
}
