const { DataTypes } = require("sequelize");
const { sq } = require("../config/db");

const List = sq.define("List", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

List.sync().then(() => {
  console.log("List Model synced");
});

module.exports = List;
