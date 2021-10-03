const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: process.env.PokemonKey})

class PokemonAPI {

    constructor() {
    }

    findByName(searchValue) {
        return new Promise((resolve, reject) => {
            pokemon.card.where({ q: `!name:${searchValue}`})
            .then(apiData => {
                // if results, resolve
                if (apiData.count >= 1) {
                    resolve(apiData);
                // if no results, try expanded query
                } else {
                    // write a better expanded search
                    pokemon.card.where({ q: `name:${searchValue}`})
                    .then(apiData => {
                        resolve(apiData);
                    })
                    .catch(err => {
                        reject(err);
                    })
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    findByID(api_id) {
        return new Promise((resolve, reject) => {
            pokemon.card.find(api_id)
            .then(apiData => {
                resolve(apiData);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

module.exports = PokemonAPI;