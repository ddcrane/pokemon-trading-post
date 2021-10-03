const { PostCard } = require('../models');

const postCardData = [
    {
        post_id: "1",
        card_id: "1",
        klass: "trade"
    },
    {
        post_id: "1",
        card_id: "2",
        klass: "want"
    },
    {
        post_id: "2",
        card_id: "3",
        klass: "trade"
    },
    {
        post_id: "2",
        card_id: "4",
        klass: "want"
    }
];

const seedPostCards = () => PostCard.bulkCreate(postCardData);

module.exports = seedPostCards;
