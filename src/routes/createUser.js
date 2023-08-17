const express = require("express");
const router = express.Router();

const createController = require("../controllers/createUserController.js");


router.post("/", createController.create);

module.exports = router;