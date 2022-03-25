const Sequelize = require("sequelize");

const sequelize = new Sequelize("SentenceBuilder", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;