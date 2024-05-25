const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

const UserInfo = sequelize.define("user_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: true },
  img: { type: DataTypes.STRING, allowNull: true },
});

const UserItem = sequelize.define("user_items", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  weight: { type: DataTypes.INTEGER },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define("categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(UserItem, { onDelete: "cascade" });
UserItem.belongsTo(User);

User.hasMany(Category, { onDelete: "cascade" });
Category.belongsTo(User);

Category.hasMany(UserItem, { onDelete: "cascade" });
UserItem.belongsTo(Category);

module.exports = {
  User,
  UserItem,
  Category,
  UserInfo,
};
