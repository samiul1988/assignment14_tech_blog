const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: Post,
//         attributes: ['id', 'title', 'post_url', 'created_at']
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'created_at'],
//         include: {
//           model: Post,
//           attributes: ['title']
//         }
//       },
//       {
//         model: Post,
//         attributes: ['title'],
//         through: Vote,
//         as: 'voted_posts'
//       }
//     ]
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', (req, res) => {
    // expects {username: 'Samiulhc', password: 'password1234'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(newUserData => {
            req.session.save(() => {
                req.session.user_id = newUserData.id;
                req.session.username = newUserData.username;
                req.session.isAuthenticated = true;

                res.json({ user: newUserData, message: 'Welcome to Tech Blog!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    // expects {username: 'Samiulhc', password: 'password1234'}
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user found with the provided username!' });
            return;
        }

        // Check if the user password matches with the one in the database
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        // For valid user, update session info
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.isAuthenticated = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    // Logout for authenticated user
    if (req.session.isAuthenticated) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// router.put('/:id', (req, res) => {
//   // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

//   // pass in req.body instead to only update what's passed through
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
