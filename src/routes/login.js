const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/loginController.js");
const { Module } = require("module");


router.post("/", LoginController.create);

router.post("/user/:id", checkToken, LoginController.private);

function checkToken(req, res, next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ msg:'Acesso Negado'});
    }

    try {
      const secret = process.env.SECRET;
      
      jwt.verify(token, secret);

      next();
    } catch (error) {
        res.status(400).json({ msg: "Token Inválido"})
    }
}

module.exports = router;