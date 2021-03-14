// import required modules
const router = require('express').Router();
const { Comment } = require('../../models');

// import auth middleware
const auth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(coomentData => res.json(coomentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new comment
router.post('/', auth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(coomentData => res.json(coomentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete a comment based on id
router.delete('/:id', auth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(coomentData => {
      if (!coomentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(coomentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
