const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/loginController.js");
const { Module } = require("module");


router.post("/", LoginController.create);

module.exports = router;