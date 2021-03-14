const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'This is a random comment',
    user_id: 1,
    post_id: 5
  },
  {
    comment_text: 'This is a random comment 2',
    user_id: 2,
    post_id: 5
  },
  {
    comment_text: 'This is a random comment 3',
    user_id: 4,
    post_id: 5
  },
  {
    comment_text: 'This is a random comment',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'The user commented on his own post',
    user_id: 1,
    post_id: 1
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
