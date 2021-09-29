const { Card } = require('../models');

const cardData = [
    {
        api_id: 1,
        card_name: "Charizard",
        set_name: "Vivid Voltage",
        card_rarity: "Rare",
        image_url: "https://images.pokemontcg.io/swsh4/25.png"
    },
    {
        api_id: 2,
        card_name: "Pikachu",
        set_name: "Base",
        card_rarity: "Common",
        image_url: "https://images.pokemontcg.io/swsh4/25.png"

    }
];

const seedCards = () => Card.bulkCreate(cardData);

module.exports = seedCards;