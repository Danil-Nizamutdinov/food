const { User, UserItem, UserInfo } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class AdminController {
  async registration(req, res) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.json({ message: "Некорректный email или password" });
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return res.json({ message: "Пользователь с таким email уже существует" });
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
    });
    if (role === "shop") {
      await UserInfo.create({ name: null, logo: null, userId: user.id });
    }
    const users = await User.findAll();

    return res.json(users);
  }

  async deleteUser(req, res) {
    const { userId } = req.query;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.json({ message: "цели не найдено" });
    }

    await user.destroy();

    const users = await User.findAll();

    return res.json(users);
  }

  async get(req, res) {
    try {
      let { limit, page } = req.query;

      page = page || 1;
      limit = limit || 9;

      let offset = page * limit - limit;

      const count = await User.count();

      let totalPages = Math.ceil(count / limit);

      const users = await User.findAll({
        attributes: ["id", "email", "role"],
        limit,
        offset,
      });

      return res.json({ users, totalPages });
    } catch (e) {
      return res.json({ message: "что то не так" });
    }
  }
}

module.exports = new AdminController();
