#! /app/bin/node

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("../config/connection");
require('dotenv').config();

app.use(express.json());

const { Card } = require('../../models');
const PokemonAPI = require('./models/PokemonAPI');

// const escapeCard = cardData => {

//     const card = {
//         api_id: cardData.id,
//         name: cardData.name,
//         set: cardData.set,
//         rarity: cardData.card_rarity,
//         image: cardData.image_url,
//         // more properties
//     };

//     return card;
// };

/*
    Sync DB and then fetch Pokemon API
*/
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Updating Cards from Pokemon API...');
        process.exit();
        // Card.findAll({
        //     attributes: { 'api_id' }
        // })
        // .then(dbCardData => {
        //     for (const card in dbCardData) {
        //         new PokemonAPI.findOne(card.api_id)
        //             .then(apiCardData => {
        //                 Card.update(escapeCard(apiCardData), {
        //                     where: {
        //                         id: card.id
        //                     }
        //                 })
        //                 .then(dbCardData => {
        //                     console.log(`apiStatus: Succesful Card Update [ id: ${dbCardData.id} ]`, req.body);
        //                     return;
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                     return;
        //                 });
        //             })
        //     }
        //     res.status(200);
        //     return;
        // }).then(() => {
        //     process.exit();
        // })
        // .catch(err => {
        //     console.log(err);
        //     process.exit();
        // });
    });
});