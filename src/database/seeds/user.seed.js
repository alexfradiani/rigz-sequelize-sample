const { User } = require('../models');
const faker = require('faker');

class UserSeed {
  async createMany(count) {
    const randomUsers = [];
    for (let i = 0; i < count; i++) {
      randomUsers.push({
        name: faker.name.firstName(),
        email: faker.internet.email()
      });
    }

    await User.bulkCreate(randomUsers);
  }
}

module.exports = UserSeed;
