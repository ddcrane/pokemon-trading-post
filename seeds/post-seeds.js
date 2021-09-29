const { Post } = require('../models');

const postData = [
    {
        user_id: 1,
        offer_status: true
    },
    {
        user_id: 2,
        offer_status: true
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
