const { Comment } = require('../models');

const commentData = [
    {
        text: "lorem ipsum dolar sit amet",
        user_id: 2,
        post_id: 1
    },
    {
        text: "lorem ipsum dolar sit amet",
        user_id: 4,
        post_id: 1
    },
    {
        text: "lorem ipsum dolar sit amet",
        user_id: 3,
        post_id: 2
    },
    {
        text: "lorem ipsum dolar sit amet",
        user_id: 1,
        post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;