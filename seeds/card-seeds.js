const { Card } = require('../models');

const cardData = [
    {
        api_id: 1,
        card_name: "Charizard",
        set_name: "Vivid Voltage",
        card_rarity: "Rare",
        image_url: "https://images.pokemontcg.io/swsh4/25.png",
        isTrade: true,
        isWant: false
    },
    {
        api_id: 2,
        card_name: "Bulbasaur",
        set_name: "Base",
        card_rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc",
        isTrade: false,
        isWant: true
    },
    {
        api_id: 3,
        card_name: "Bulbasaur 2",
        set_name: "Base",
        card_rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc",
        isTrade: true,
        isWant: false

    },
    {
        api_id: 4,
        card_name: "Bulbasaur 3",
        set_name: "Base",
        card_rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc",
        isTrade: false,
        isWant: true
    }
];

const seedCards = () => Card.bulkCreate(cardData);

module.exports = seedCards;