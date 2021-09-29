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
        card_name: "Bulbasaur",
        set_name: "Base",
        card_rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc"

    }
];

const seedCards = () => Card.bulkCreate(cardData);

module.exports = seedCards;