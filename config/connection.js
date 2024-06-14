const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize

if (process.env.DBURL) {
  sequelize = new Sequelize(process.env.DBURL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  });
} else {

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
}

module.exports = sequelize;
