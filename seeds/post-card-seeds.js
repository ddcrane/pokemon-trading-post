const { PostCard } = require('../models');

const postCardData = [
    {
        post_id: "1",
        card_id: "1"
    }
];

const seedPostCards = () => PostCard.bulkCreate(postCardData);

module.exports = seedPostCards;
