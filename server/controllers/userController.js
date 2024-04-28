const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const uuid = require("uuid");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ message: "пользоваетель не найден" });
    }

    const isPassword = bcrypt.compareSync(password, user.password);

    if (!isPassword) {
      return res.json({ message: "неверный пароль" });
    }

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }
  async check(req, res) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (e) {
      return res.json({ message: e });
    }
  }
  // async updateName(req, res) {
  //   const { userId, name } = req.body;

  //   const user = await User.findOne({ where: { id: userId } });
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   if (!name) {
  //     return res.json({ message: "Name not found" });
  //   }

  //   user.name = name;
  //   await user.save();

  //   return res.json(user);
  // }
}

module.exports = new UserController();
