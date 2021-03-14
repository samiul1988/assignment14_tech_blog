// import required modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// import auth middleware
const auth = require('../utils/auth');

// get all posts for dashboard
router.get('/', auth, (req, res) => {
  console.log(req.session);
  
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
    .then(userPosts => {
      const posts = userPosts.map(post => post.get({ plain: true })); // serialize data
      res.render('dashboard', { posts, dashboard: true, isAuthenticated: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single post based on post id
router.get('/edit/:id', auth, (req, res) => {
  Post.findByPk(req.params.id, {
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
    .then(postData => {
      if (postData) {
        const post = postData.get({ plain: true }); // serialize data
        
        res.render('edit-single-post', {
          post,
          isAuthenticated: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
