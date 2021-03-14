// import required modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts for homepage
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
        .then(allPostsData => {
            const posts = allPostsData.map(post => post.get({ plain: true })); // serialize data obtained from database

            res.render('homepage', {
                posts,
                isAuthenticated: req.session.isAuthenticated
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get('/post/:id', (req, res) => {
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
        .then(singlePostData => {
            if (!singlePostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = singlePostData.get({ plain: true });

            res.render('single-post-page', {
                post,
                // isAuthenticated: true
                isAuthenticated: req.session.isAuthenticated
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login request
router.get('/login', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/');
        return;
    }

    res.render('login', {action_label: "Login"});
});

// signup request
router.get('/signup', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/');
        return;
    }

    res.render('login', {action_label: "Sign up"});
});

module.exports = router;
