const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const userItemRouter = require("./userItemRouter");
const categoryRouter = require("./categoryRouter");
const userInfoRouter = require("./userInfoRouter");

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/userItem", userItemRouter);
router.use("/category", categoryRouter);
router.use("/userInfo", userInfoRouter);

module.exports = router;
