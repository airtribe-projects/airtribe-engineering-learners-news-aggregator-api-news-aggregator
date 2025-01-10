const express = require("express");
const newsRouter = express.Router();

const newsController = require("../controllers/newsController");

newsRouter.get("/", newsController.news);

module.exports = newsRouter;