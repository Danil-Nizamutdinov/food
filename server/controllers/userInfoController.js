const { User, UserInfo } = require("../models/models");

const path = require("path");
const uuid = require("uuid");

class UserInfoController {
  async get(req, res) {
    const { userId } = req.query;
    const userInfo = await UserInfo.findOne({ where: { userId } });

    return res.json(userInfo);
  }
  async updateLogo(req, res) {
    const { userId } = req.body;
    const { img } = req.files;

    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const userInfo = await UserInfo.findOne({ where: { id: userId } });

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
}

module.exports = new UserInfoController();
