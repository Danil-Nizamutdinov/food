const Router = require("express");
const router = new Router();
const userInfoController = require("../controllers/userInfoController");

router.get("/get", userInfoController.get);
router.patch("/updateLogo", userInfoController.updateLogo);
router.patch("/updateName", userInfoController.updateName);

module.exports = router;
