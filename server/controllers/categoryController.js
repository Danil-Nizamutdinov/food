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
  async delete(req, res) {
    try {
      const { userId, categoryId } = req.query;
      console.log("----------", userId, "--------------");
      console.log("----------", categoryId, "--------------");

      const category = await Category.findOne({
        where: { userId, id: categoryId },
      });
      await category.destroy();

      const categorys = await Category.findAll({ where: { userId } });
      return res.json(categorys);
    } catch (error) {
      return res.status(404).json({ message: "что пошло не так" });
    }
  }
}

module.exports = new CategoryController();
