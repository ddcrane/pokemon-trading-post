const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Card } = require('../../models');

// authentication
const authentication = require('../../utils/auth');

// all cards
router.get('/', (req, res) => {
    Card.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// single card
router.get('/:id', (req, res) => {
    Card.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbCardData => {
        if (!dbCardData) {
            res.status(404).json({ message: 'No card found with this id' });
            return;
        }
        res.json(dbCardData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create
router.post('/', authentication, (req, res) => {
    // expects {}
    Card.create({
        // Card properties
    })
    .then(dbCardData => res.json(dbCardData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update
router.put('/:id', authentication, (req, res) => {
    Card.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(dbCardData => {
        if (!dbCardData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbCardData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// destroy
router.delete('/:id', authentication, (req, res) => {
    Card.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCardData => {
        if (!dbCardData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbCardData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;