import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Restaurant } from './entities/restaurant.entity';
import { User } from './entities/users.entity';
import { typeOrmConfig } from './infra/db/providers/typeorm.config';
import { SeedDatabase } from './infra/db/seed';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Restaurant]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedDatabase],
})
export class AppModule {}
