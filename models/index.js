const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const PostCard = require('./PostCard');
const Card = require('./Card');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Post.belongsToMany(Card, {
    through: PostCard,
    as: 'post_cards',
    foreignKey: 'post_id'
});

Card.belongsToMany(Post, {
    through: PostCard,
    as: 'post_cards',
    foreignKey: 'card_id'
})

module.exports = { User, Post, Comment, Card, PostCard };