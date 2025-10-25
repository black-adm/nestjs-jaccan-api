import { faker } from '@faker-js/faker';
import { InjectDataSource } from '@nestjs/typeorm';
import { Establishment } from 'src/entities/establishment.entity';
import { User, UserRole } from 'src/entities/users.entity';
import { DataSource } from 'typeorm';

export class SeedDatabase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute() {
    await this.dataSource.synchronize(true);

    await this.dataSource.transaction(async (db) => {
      const managers: User[] = [];

      for (let i = 0; i < 15; i++) {
        const manager = new User();

        manager.name = faker.person.fullName();
        manager.email = faker.internet.email();
        manager.phone = faker.phone.number();
        manager.role = UserRole.MANAGER;

        const savedManager = await db.save(manager);
        managers.push(savedManager);
      }

      for (let i = 0; i < 35; i++) {
        const user = new User();

        user.name = faker.person.fullName();
        user.email = faker.internet.email();
        user.phone = faker.phone.number();
        user.role = UserRole.CUSTOMER;

        await db.save(user);
      }

      for (let i = 0; i < 50; i++) {
        const establishment = new Establishment();

        establishment.name = faker.company.name();
        establishment.description = faker.lorem.sentence();

        if (i < 15) establishment.managerId = managers[i].id;

        await db.save(establishment);
      }
    });
  }
}
