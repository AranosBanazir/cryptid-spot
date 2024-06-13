const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cryptid extends Model {}

Cryptid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spotter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "spotter",
        key: "id",
      },
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "cryptid",
  }
);

module.exports = Cryptid;
