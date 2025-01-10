const express = require("express");
const userRouter = express.Router();
const User = require("../models/userModel");

const userController = require("../controllers/userController");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
})

module.exports = userRouter;