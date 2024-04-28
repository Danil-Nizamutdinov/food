const { Category } = require("../models/models");

class CategoryController {
  async create(req, res) {
    try {
      const { userId, name } = req.body;

      if (!userId || !name) {
        return res.json({ message: "что то не так" });
      }

      await Category.create({ userId, name });

      const category = await Category.findAll({ where: { userId } });

      return res.json(category);
    } catch (e) {
      return res.json({ message: "что то пошло не так" });
    }
  }
  async get(req, res) {
    const { userId } = req.query;
    const category = await Category.findAll({ where: { userId } });
    return res.json(category);
  }
}

module.exports = new CategoryController();
