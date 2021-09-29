const { PostCard } = require('../models');

const postCardData = [
    {
        post_id: "1",
        card_id: "1",
        klass: "true"
    },
    {
        post_id: "2",
        card_id: "2",
        klass: "false"
    }
];

const seedPostCards = () => PostCard.bulkCreate(postCardData);

module.exports = seedPostCards;
