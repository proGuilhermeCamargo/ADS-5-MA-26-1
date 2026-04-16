const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Dogs = sequelize.define('Dogs', {
name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  years: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 15] 
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('image'));
    },
    set(value) {
      this.setDataValue('image', JSON.stringify(value));
    }
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Dogs;
