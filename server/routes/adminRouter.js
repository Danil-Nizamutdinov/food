const Router = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
  "/createUser",
  // checkRoleMiddleware("admin"),
  adminController.registration
);
router.delete(
  "/deleteUser",
  checkRoleMiddleware("admin"),
  adminController.deleteUser
);
router.get("/getUsers", checkRoleMiddleware("admin"), adminController.get);

module.exports = router;
