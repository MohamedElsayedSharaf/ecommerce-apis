const express = require("express");

const {
  
} = require("../utils/validators/brandValidator");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
} = require("../controllers/userController");
const { createUserValidator, updateUserValidator } = require("../utils/validators/userValidator");

const router = express.Router();

router.post(
  "/",
  uploadUserImage,
  resizeImage,
  createUserValidator,
  createUser
);

router.get("/", getUsers);

router.get("/:id", getUser);

router.put(
  "/:id",
  uploadUserImage,
  resizeImage,
  updateUserValidator,
  updateUser
);

router.delete("/:id", deleteUser);

module.exports = router;
