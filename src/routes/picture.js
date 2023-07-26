const express = require("express");
const router = express.Router();

const PictureController = require("../controllers/pictureController.js");
const { Module } = require("module");

router.post("/", PictureController.create);

module.exports = router;