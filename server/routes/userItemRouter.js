const Router = require("express");
const router = new Router();
const userItemController = require("../controllers/userItemController");

router.post("/create", userItemController.createUserItem);
router.delete("/delete", userItemController.deleteUserItem);
router.get("/get", userItemController.getUserItem);
router.get("/getLast", userItemController.getLastUserItem);

module.exports = router;
