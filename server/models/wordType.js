const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const WordType = sequelize.define("wordType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  wordType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = WordType;