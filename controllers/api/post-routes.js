const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const auth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a single post based on post id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
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

// create a new post
router.post('/', auth, (req, res) => {
    // expects {post_title: 'This is a new post', post_content: 'random content', user_id: 1}
    Post.create({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(newPostData => res.json(newPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update a single post based on post id
router.put('/:id', auth, (req, res) => {
    Post.update(
        {
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a single post based on post id
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
