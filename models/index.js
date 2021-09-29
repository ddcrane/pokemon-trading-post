const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Card = require('./Card');
const PostCard = require('./PostCard');


// Posts & Users
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Posts & Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// Users & Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Posts & Cards
Post.belongsToMany(Card, {
    through: PostCard,
    as: 'cards',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Card.belongsToMany(Post, {
    through: PostCard,
    as: 'posts',
    foreignKey: 'card_id',
    onDelete: 'SET NULL'
});

Post.hasMany(PostCard, {
    foreignKey: 'post_id'
});

Card.hasMany(PostCard, {
    foreignKey: 'card_id'
});

PostCard.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

PostCard.belongsTo(Card, {
    foreignKey: 'card_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Post, Comment, Card, PostCard };