import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Delete temporary
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
  await app.listen(AppModule.port);
}
bootstrap();
