const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Word = sequelize.define("word", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  wordTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Word;