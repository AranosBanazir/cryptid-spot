const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Sighting extends Model {}

Sighting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    spotter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "spotter",
        key: "id",
      },
    },
    cryptid_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cryptid",
        key: "id",
      },
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "sighting",
  }
);

module.exports = Sighting;
