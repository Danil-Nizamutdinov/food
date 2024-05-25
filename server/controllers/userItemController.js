const { UserItem, User } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class UserItemController {
  async createUserItem(req, res) {
    try {
      const { name, price, weight, userId, categoryId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".png";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const userItem = await UserItem.create({
        name,
        price,
        weight,
        userId,
        categoryId,
        img: fileName,
      });

      return res.json(userItem);
    } catch (e) {
      return res.json({ message: "что то пошло не так" });
    }
  }

  async deleteUserItem(req, res) {
    const { userId, userItemId } = req.query;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.json({ message: "цели не найдено" });
    }

    const userItem = await UserItem.findOne({
      where: { userId, id: userItemId },
    });

    if (!userItem) {
      return res.json({ message: "вложения нет" });
    }

    await userItem.destroy();

    return res.json(userItem);
  }

  async getUserItem(req, res) {
    let { categoryId, userId, page, limit } = req.query;

    page = page || 1;
    limit = limit || 9;

    let offset = page * limit - limit;

    if (!categoryId || !userId) {
      return res.json({ message: "плохо все" });
    }

    const userItem = await UserItem.findAll({
      where: { userId, categoryId },
      limit,
      offset,
    });

    return res.json(userItem);
  }

  async getLastUserItem(req, res) {
    try {
      const { userId } = req.query;

      const lastUserItem = await UserItem.findOne({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
      });

      return res.json(lastUserItem);
    } catch (error) {
      return res.status(123).json({ message: "error" });
    }
  }
}

module.exports = new UserItemController();
