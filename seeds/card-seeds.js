const { Card } = require('../models');

const cardData = [
    {
        api_id: 1,
        name: "Charizard",
        set: "Vivid Voltage",
        rarity: "Rare",
        image_url: "https://images.pokemontcg.io/swsh4/25.png"
    },
    {
        api_id: 2,
        name: "Bulbasaur",
        set: "Base",
        rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc"
    },
    {
        api_id: 3,
        name: "Bulbasaur 2",
        set: "Base",
        rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc"
    },
    {
        api_id: 4,
        name: "Bulbasaur 3",
        set: "Base",
        rarity: "Common",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENUYfYzmIgkStm5YEyJ9S7J1fTOCOVRRv35F53mbOVUz23biWHPuFc9Ft644&usqp=CAc"
    }
];

const seedCards = () => Card.bulkCreate(cardData);

module.exports = seedCards;