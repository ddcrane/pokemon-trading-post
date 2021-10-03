const router = require('express').Router();
const { resolve } = require('path');
const sequelize = require('../config/connection');
const { Post, User, Comment, Card, PostCard} = require('../models');
const PokemonAPI = require('../models/PokemonAPI');

// authentication
const authentication = require('../utils/auth');

// root
router.get('/', (req, res) => {
    Post.findAll({
        where: {
            status: true
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Card,
                as: 'cards',
                through: PostCard
            },
            {
                model: Comment,
                include: {
                    model: User
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        const templateData = {
            posts: posts,
            currentSession: {
                user_id: req.session.user_id,
                username: req.session.username,
                loggedIn: req.session.loggedIn
            }
        };

        // console.log('templateData', templateData);
        res.render('homepage', templateData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// register
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('register');
});

// new-post
router.get('/new-post', authentication, (req, res) => {
    res.render('post', {
        loggedIn: req.session.loggedIn
    });
});

//my-posts
router.get('/my-posts', authentication, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
            status: true
        },
        attributes: [
            'id',
            'status',
            'created_at',
            'updated_at'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Card,
                as: 'cards',
                through: PostCard
            },
            {
                model: Comment,
                include: {
                    model: User
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('posts', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// search Pokemon API
router.get('/search/:search/:klass', authentication, (req, res) => {
    // search by ID
    if (req.params.klass == 'id') {
        new PokemonAPI().findByID(req.params.search)
        .then(apiCardData => {
            return apiCardData;
        })
        .then(apiCardData => {
            res.json(apiCardData);
        })
        .catch(err => {
            res.status(400).json(err);
        });

    // search by name
    } else if (req.params.klass == 'name') {
        new PokemonAPI().findByName(req.params.search)
        .then(apiCardData => {
            return apiCardData;
        })
        .then(apiCardData => {
            res.json(apiCardData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    } else {
        res.status(500).json({message: 'Cannot run search without search type'})
    }    
});

// dbCheck
router.post('/check/:api_id', authentication, (req, res) => {
    Card.findOne({
        where: {
            api_id: req.params.api_id
        }
    })
    .then(dbCardData => {
        if (!dbCardData) {
            // card does not exist, create and return
            Card.create({
                api_id: req.body.id,
                name: req.body.name,
                set: req.body.set.name,
                rarity: req.body.rarity,
                image_url: req.body.images.large
            })
            .then(dbCardData => res.json(dbCardData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
            
        } else {
            // card exists, return
            res.json(dbCardData)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;