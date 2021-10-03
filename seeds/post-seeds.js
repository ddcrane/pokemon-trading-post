const { Post } = require('../models');

const postData = [
    {
        user_id: 1,
        status: true
    },
    {
        user_id: 2,
        status: true
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
