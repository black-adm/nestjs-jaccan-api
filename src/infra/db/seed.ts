import { faker } from '@faker-js/faker';
import { InjectDataSource } from '@nestjs/typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { User } from 'src/entities/users.entity';
import { DataSource } from 'typeorm';

export class SeedDatabase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute() {
    await this.dataSource.synchronize(true);

    await this.dataSource.transaction(async (db) => {
      for (let i = 0; i < 100; i++) {
        const user = new User();
        user.name = faker.person.fullName();
        user.email = faker.internet.email();
        user.phone = faker.phone.number();
        await db.save(user);
      }

      for (let i = 0; i < 100; i++) {
        const restaurant = new Restaurant();
        restaurant.name = faker.company.name();
        restaurant.description = faker.lorem.sentence();
        await db.save(restaurant);
      }
    });
  }
}
