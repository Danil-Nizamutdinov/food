const { User, UserInfo } = require("../models/models");

const path = require("path");
const uuid = require("uuid");

class UserInfoController {
  async get(req, res) {
    const { userId } = req.query;
    const userInfo = await UserInfo.findOne({ where: { userId } });

    return res.json(userInfo);
  }
  async getShop(req, res) {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 9;

    let offset = page * limit - limit;

    const count = await UserInfo.count({ where: { role: "shop" } });

    let totalPages = Math.ceil(count / limit);

    const userInfo = await UserInfo.findAll({
      where: { role: "shop" },
      limit,
      offset,
    });
    if (!userInfo) {
      return res.json({ message: "пусто" });
    }
    return res.json({ userInfo, totalPages });
  }
  async getRestaurant(req, res) {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 9;

    let offset = page * limit - limit;

    const count = await UserInfo.count({ where: { role: "restaurant" } });

    let totalPages = Math.ceil(count / limit);

    const userInfo = await UserInfo.findAll({
      where: { role: "restaurant" },
      limit,
      offset,
    });
    if (!userInfo) {
      return res.json({ message: "пусто" });
    }
    return res.json({ userInfo, totalPages });
  }
  async updateLogo(req, res) {
    const { userId } = req.body;
    const { img } = req.files;

    let fileName = uuid.v4() + ".png";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const userInfo = await UserInfo.findOne({ where: { userId } });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!img) {
      return res.json({ message: "Photo not found" });
    }

    userInfo.img = fileName;
    await userInfo.save();

    return res.json(userInfo);
  }
  async updateName(req, res) {
    const { userId, name } = req.body;
    const userInfo = await UserInfo.findOne({ where: { userId } });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!name) {
      return res.json({ message: "Name not found" });
    }

    userInfo.name = name;
    await userInfo.save();

    return res.json(userInfo);
  }
  async updateRole(req, res) {
    const { userId, role } = req.body;
    const userInfo = await UserInfo.findOne({ where: { userId } });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!role) {
      return res.json({ message: "Name not found" });
    }

    userInfo.role = role;
    await userInfo.save();

    return res.json(userInfo);
  }
}

module.exports = new UserInfoController();
