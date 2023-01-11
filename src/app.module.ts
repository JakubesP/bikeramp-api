import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
  ],
})
export class AppModule {
  static port: number;

  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
}
