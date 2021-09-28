const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: process.env.PokemonKey})

class PokemonAPI {

    constructor() {
    }

    findByCardName(name) {
        return new Promise((resolve, reject) => {
            pokemon.card.where({ q: `name:${name}`})
            .then(apiData => {
                resolve(apiData);
            }).catch(err => {
                reject(err);
            });
        });
    }

    findByCardID(id) {
        return new Promise((resolve, reject) => {
            pokemon.card.find(id)
            .then(apiData => {
                resolve(apiData);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

module.exports = PokemonAPI;