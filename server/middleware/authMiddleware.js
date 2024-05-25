const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(typeof req.headers.authorization);

    if (token === "null") {
      return res.json({ message: null });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.json({ message: "что то пошло не так" });
  }
};
