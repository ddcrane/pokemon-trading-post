const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');
const seedPosts = require('./post-seeds');
const seedCards = require('./card-seeds');
const seedPostCards = require('./post-card-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');
  await seedCards();
  console.log('\n----- CARDS SEEDED -----\n');
  await seedPostCards();
  console.log('\n----- POST CARDS SEEDED -----\n');

  process.exit(0);
};

seedAll();
