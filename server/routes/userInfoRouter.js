const Router = require("express");
const router = new Router();
const userInfoController = require("../controllers/userInfoController");

router.get("/get", userInfoController.get);
router.get("/getShop", userInfoController.getShop);
router.get("/getRestaurant", userInfoController.getRestaurant);
router.patch("/updateLogo", userInfoController.updateLogo);
router.patch("/updateName", userInfoController.updateName);
router.patch("/updateRole", userInfoController.updateRole);

module.exports = router;
