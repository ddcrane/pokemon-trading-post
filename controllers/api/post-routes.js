const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Card, PostCard } = require('../../models');

// authentication
const authentication = require('../../utils/auth');

// all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Card,
                through: Post,
                as: 'post_cards'
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Card,
                through: Post,
                as: 'post_cards'
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create
router.post('/', authentication, (req, res) => {
    // expects {cards_trade: '5,3,7', cards_want: '2,3,1'}
    Post.create({
        user_id: req.session.user_id
    })
    .then(dbPostData => {
        
        if (req.body.cards_trade) {
            const cardTagIdArr = req.body.cards_trade.split(',').map((card_id) => {
                return {
                    card_id: card_id,
                    post_id: dbPostData.id,
                    klass: 'trade'
                };
            });

            PostCard.bulkCreate(cardTagIdArr);
        }

        if (req.body.cards_want) {
            const cardTagIdArr = req.body.cards_want.split(',').map((card_id) => {
                return {
                    card_id: card_id,
                    post_id: dbPostData.id,
                    klass: 'want'
                };
            });

            PostCard.bulkCreate(cardTagIdArr);
        }
        
        return dbPostData;
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update
router.put('/:id', authentication, (req, res) => {
    Post.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// destroy
router.delete('/:id', authentication, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;