const User = require("./models/User.js");
const bcrypt = require("bcrypt");

require('dotenv').config();

exports.create = async (req, res) => {
    const { cnpj, password } = req.body

    if (!cnpj){
        return res.status(422).json({ msg: 'Cnpj é Obrigatório!'});
    }

    if (!password){
        return res.status(422).json({ msg: 'Senha é Obrigatória!'});
    }

    const userExists = await User.FindOne({ cnpj: cnpj});
    
    if (userExists) {
        return res.status(422).json({ msg: 'CNPJ Já Existente em Nossa Base de Dados!'});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        cnpj,
        password: passwordHash,
    });

    try {

        await user.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso!'});
        
    } catch (error) {
        res.status(500).json({ msg: 'Erro no Servidor'});
    }
}