const { User } = require('../models');

const userData = [
    {
        email: 'bpkaufman4@gmail.com',
        username: 'bpkaufman4',
        password: 'mypassword'
    },
    {
        email: 'emkaufman4@gmail.com',
        username: 'emkaufman4',
        password: 'mypassword'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
