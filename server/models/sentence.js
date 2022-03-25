const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Sentence = sequelize.define("sentence", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  sentenceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  wordId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Sentence;