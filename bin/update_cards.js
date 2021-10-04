#! /app/bin/node

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("../config/connection");

require('dotenv').config();

app.use(express.json());

const { Card } = require('../models');
const PokemonAPI = require('../models/PokemonAPI');

const escapeCard = apiCardData => {
    const card = {
        api_id: apiCardData.id,
        name: apiCardData.name,
        set: apiCardData.set.name,
        rarity: apiCardData.rarity,
        image: apiCardData.images.large
    };
    return card;
};

const getCards = () => {
    return new Promise((resolve, reject) => {
        Card.findAll({
            attributes: [ 'id', 'api_id' ]
        })
        .then(dbCardData => {
            resolve(dbCardData);
        })
        .catch(err => {
            console.log('Error querying database', err);
            reject(err);
        });
    });
    
}

const updateCard = (id, cardData) => {
    return new Promise((resolve, reject) => {
        Card.update(escapeCard(cardData), {
            individualHooks: true,
            where: {
                id: id
            }
        })
            .then(dbCardData => {
                if (dbCardData[0] > 0) {
                    console.log(`Succesful Card Update [ id: ${dbCardData[1][0].id} ]`, dbCardData[1][0]);
                }
                resolve(dbCardData[1][0]);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
    
}

const findPokemon = (api_id) => {
    return new Promise((resolve, reject) => {
        new PokemonAPI().findByID(api_id)
            .then(apiCardData => { 
                resolve(apiCardData);
            })
            .catch(err => {
                reject(err);
            });
    });
}

const start = () => {
    getCards()
        .then(dbCardData => {
            eachCard(0, dbCardData.length, dbCardData);
        })
        .catch(err => {
            console.log('getCards error', err);
        })
}

const exit = () => {
    console.log('\nExiting Updating Cards with Pokemon API...\n');
    process.exit();
}

const eachCard = (index, cardCount, dbCardData) => {

    const cardId = dbCardData[index].id;
    const apiId = dbCardData[index].api_id;
    

    // console.log('startingData', {
    //     index: index, 
    //     cardCount: cardCount,
    //     cardId: cardId,
    //     apiId: apiId,
    //     cardData: dbCardData[index]
    // });

    findPokemon(apiId)
        .then(apiCardData => {
            // update card
            updateCard(cardId, apiCardData)
                .then(() => {
                    return;
                })
                .catch(err => {
                    return;
                });
        })
        .then(() => {
            // unless its the last element, advance script
            if (index + 1 < cardCount) {

                eachCard(index+1, cardCount, dbCardData);
                return;

            } else {
                exit();
            }
        })
        .catch(err => {
            if (err.response.status != 404) {
                console.log('error', err);
            }
            
            // unless its the last element, advance script
            if (index + 1 < cardCount) {
                eachCard(index+1, cardCount, dbCardData);
                return;
            } else {
                exit();
            }
        });
}

/*
    Sync DB and then start task
*/
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('\nUpdating Cards with Pokemon API...\n');
        start();
    });
});