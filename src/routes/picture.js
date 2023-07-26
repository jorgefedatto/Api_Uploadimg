const express = require("express");
const router = express.Router();

const PictureController = require("../controllers/pictureController.js");
const { Module } = require("module");

const upload = require("../config/multer.js");

router.post("/", upload.single("file"), PictureController.create);
router.get("/", PictureController.findAll);

module.exports = router;