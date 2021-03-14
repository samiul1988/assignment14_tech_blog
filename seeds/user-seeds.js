const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'Samiulhc',
    password: 'password123'
  },
  {
    username: 'Robinhood',
    password: 'password123'
  },
  {
    username: 'Gladiator',
    password: 'password123'
  },
  {
    username: 'Msmith',
    password: 'password123'
  },
  {
    username: 'Rsmith',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
