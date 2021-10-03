const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PokemonAPI = require('./models/PokemonAPI');

const sess = {
    secret: 'process.env.SESS_SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// Template.registerHelper('object', function({hash}) {
//     return hash;
//   })
//   Template.registerHelper('array', function() {
//     return Array.from(arguments).slice(0, arguments.length-1)
//   })


// hbs.handlebars.registerHelper('partial', function (partialName, options) {
//     return options.fn(JSON.parse(data));
// });

// register handlebars helpers
hbs.handlebars.registerHelper('isSame', function (value1, value2) {
    return value1 == value2;
});

// iterate over array and mix in variables
hbs.handlebars.registerHelper('eachWith', function ( array, options ) {
    let contentString = "";
    let eachArray = [];

    // iterate over array and push to eachArray
    for (const object of array) {
        eachArray.push(object);
    };

    if ( eachArray && eachArray.length > 0 ) {
        // iterate over eachArray
        for (const [i, obj] in eachArray) {

            // add option to object and add to return string
            for (const [k, v] of Object.entries(options.hash)) {
                // set options to data object
                eachArray[i][k] = v;
                // add options to contentString
                contentString = contentString + options.fn(eachArray[i]);
            }
        }
    } else {
        contentString = options.inverse(this);
    }

    return contentString;
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});