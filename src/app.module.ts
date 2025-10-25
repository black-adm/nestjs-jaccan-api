import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { User } from './entities/users.entity';
import { typeOrmConfig } from './infra/db/providers/typeorm.config';
import { SeedDatabase } from './infra/db/seed';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Establishment]),
  ],
  controllers: [],
  providers: [SeedDatabase],
})
export class AppModule {}
