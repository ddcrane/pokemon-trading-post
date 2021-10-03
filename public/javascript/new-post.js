const resetAddCard = () => {
    $('form#add-card').addClass('hidden');
    $('form#add-card #card-search').val('');
    $('form#add-card #search').show();
    $('form#add-card #step-2').remove();
}

// append selection ui to frontend
const appendSelectCard = (options) => {
    // default option
    let optionsEl = '<option value="">Select Card</option>';

    // build options element
    for (const option of options) {
        optionsEl += `<option value="${option.id}">${option.name}</option>`;
    }

    // selection html
    const html = `<div class="step" id="step-2">
                    <div>
                        <label for="card-select">Step 2. Select Card</label>
                        <select name="card-select" id="card-select" class="row text mx-auto">
                            ${optionsEl}
                        </select>
                    </div>
                    <div>
                        <button id="select" class="btn btn-primary mx-auto">Add Card</button>
                    </div>
                </div>`;
    
    // append to anchor 
    $('#add-card > #form-anchor').append(html);
}

// append card to ui
const appendCardToPost = (cardData, anchor) => {

    // get current card values
    let currentCards = $(`#new-${anchor}`).val();

    if (!currentCards) {
        // create empty array
        currentCards = [];
    } else {
        // create array from value string
        currentCards = currentCards.split(',');
    }

    // add selected card to current card array
    currentCards.push(cardData.id);

    // convert card array into string
    updatedCards = currentCards.join(',');

    // add values to new post
    $(`#new-${anchor}`).val(updatedCards);

    // build html element
    const html =  `<div class="card-info">
        <img class="card-img" src="${cardData.image_url}" alt="">
        <p class="card-atrs">Name: ${cardData.name}</p>
        <p class="card-atrs">Set: ${cardData.set}</p>
        <p class="card-atrs">Rarity: ${cardData.rarity}</p>
    </div>`;

    // append html to post anchor
    $(`#${anchor}`).append(html); 
}

// search pokemon api
const searchPokemonApi = (searchValue, klass) => {
    return new Promise((resolve, reject) => {
        fetch(`/search/${searchValue}/${klass}`, {
            method: 'GET'
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// check db for card and conditionally create card
const dbCheckAndCreate = (cardData) => {
    return new Promise((resolve, reject) => {
        fetch(`/check/${cardData.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// create post
const createPost = (postData) => {
    return new Promise((resolve, reject) => {
        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// Add Card
$(document).on('click', "button.btn-add-card", function(e) {
    e.preventDefault();

    $(this).hide();

    // show add card form
    $('form#add-card').removeClass('hidden');

    // parent ID
    const anchorElID = $(this).parent('.card-wrapper').attr('id');

    // store parent ID
    $('#card-anchor').val(anchorElID);
    
});

// Search API for Card
$(document).on('click', "button#search", function(e) {
    e.preventDefault();
    
    const searchValue = $('#card-search').val().trim();
    let options = [];

    if (searchValue) {
        searchPokemonApi(searchValue, 'name')
        .then(response => response.json())
        .then(({data}) => {

            // push card to options array
            for (const card of data) {
                options.push({id: card.id, name: `${card.name} | ${card.id} | ${card.set.name}, ${card.rarity} `});
            }

            if (options.length >= 1) {
                $(this).hide();
                appendSelectCard(options);
            } else {
                alert('Error: Try a different search value.');
            }
            
        })
    }
});

// Select API Card
$(document).on('click', "button#select", function(e) {
    e.preventDefault();
    
    const selection = $('#card-select').val().trim();
    const anchor = $('#card-anchor').val().trim();

    if (selection) {
        searchPokemonApi(selection, 'id')
        .then(response => response.json())
        .then(cardData => {

            // Check db for card and conditionally create it
            dbCheckAndCreate(cardData)
            .then(response => response.json())
            .then(card => {
                // add card to post ui
                appendCardToPost(card, anchor);

                // reset add-card form
                resetAddCard();
            })
            
        })
    }
});

// Create Post
$(document).on('click', "button#create", function(e) {
    e.preventDefault();
    
    const cards_trade = $('#new-cards-trade').val().trim();
    const cards_want = $('#new-cards-want').val().trim();

    if (cards_trade && cards_want) {
        //create post
        createPost({
            cards_trade: cards_trade,
            cards_want: cards_want
        }).then(response => {
            if (response.ok) {
                console.log('post', response);
                window.location.href = '/';
            }
        })
    }
});

