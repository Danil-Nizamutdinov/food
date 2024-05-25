const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.create);
router.get("/get", categoryController.get);
router.delete("/delete", categoryController.delete);

module.exports = router;
