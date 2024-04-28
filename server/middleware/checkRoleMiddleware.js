const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.json({ message: "не авторизован" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.json({ message: "нет доступа" });
      }
      req.user = decoded;

      next();
    } catch (e) {
      res.json({ message: "что то пошло не так" });
    }
  };
};
