const apiTest = () => {
    fetch('https://api.pokemontcg.io/v2/cards', {
        // method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        
        headers: {
            'X-API-KEY': process.env.PokemonKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(apiData => {
        console.log(apiData);
        return apiData;
    })
}



module.exports = {
    apiTest
}