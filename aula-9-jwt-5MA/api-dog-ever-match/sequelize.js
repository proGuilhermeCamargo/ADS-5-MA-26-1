const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databaseDogEverMatch.sqlite'
});

module.exports = sequelize;