import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedDatabase } from './infra/db/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const seedDatabase = app.get(SeedDatabase);
  await seedDatabase.execute();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
