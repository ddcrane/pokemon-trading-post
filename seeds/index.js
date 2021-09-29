const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedCards = require('./card-seeds');
const seedComments = require('./comment-seeds');
const seedPostCards = require('./post-card-seeds');

const sequelize = require('../config/connection');

console.log('seeds/index');


const seedAll = async () => {
  console.log('pre-force');
  await sequelize.sync({ force: true });
  console.log('post-force');
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');
  await seedCards();
  console.log('\n----- CARDS SEEDED -----\n');
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');
  await seedPostCards();
  console.log('\n----- POST CARDS SEEDED -----\n');

  process.exit(0);
};

seedAll();
