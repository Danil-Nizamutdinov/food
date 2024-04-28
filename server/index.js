require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const models = require("./models/models");

const PORT = process.env.PORT || 5000;

const app = express();

const path = require("path");

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("server start"));
  } catch (e) {
    console.log(e);
  }
};

start();
