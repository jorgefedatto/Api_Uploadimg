const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

require('dotenv').config();

//Rota Publica para Gerar Token
exports.create = async (req, res) => {
    const { cnpj, password } = req.body;

    if (!cnpj){
        return res.status(422).json({ msg: 'O CNPJ é Obrigatório!'});
    }

    if (!password){
        return res.status(422).json({ msg: 'A senha é Obrigatória!'});        
    }

    const user = await User.findOne({ cnpj: cnpj});
    
    if (!user){
        return res.status(422).json({ msg: 'Usuario não encontrado, por Favor Verifique!'});
    }

    //check password match e gera token

    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida'});
    }

    try {

        const secret = process.env.SECRET;

        const token = jwt.sign(
          {
            id: user._id,            
          },
          secret,
        );

        res.status(200).json({ msg: 'Usuário autenticado com Sucesso', token})
        
    } catch (error) {
        return res.status(500).json({ msg: 'Aconteceu um Erro no Servidor!'})
    }
};

exports.private = async (req, res) =>{
    const id = req.params.id;

    const user = await User.findById(id, '-password');

    console.log('teste');

    if (!user){
        return res.status(404).json({ msg: 'Usuario não encontrado'});
    }

    res.status(200).json({ user });
}
