const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Login = require("../models/Login.js");
const config = require('../config/config.js');

exports.create = async (req, res) => {
    const { cnpj, senha } = req.body;

    try {        
        const login = await Login.findOne({ cnpj });

        if (!login) {
            return res.status(404).json({ message: 'CNPJ não encontrado.' });
        }
        console.log(login.senha);
        
        const isPasswordValid = await bcrypt.compare(senha, login.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ cnpj: user.cnpj }, config.secret, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};