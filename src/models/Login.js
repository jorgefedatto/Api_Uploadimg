const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    cnpj: { type: String, required: true},
    senha: { type: String, required: true},
});

UserSchema.pre('save', async function (next) {
    const login = this;
    if (!login.isModified('senha')) return next();

    const salt = await bcrypt.genSalt(10);
    login.senha = await bcrypt.hash(login.senha, salt);
    next();
})

module.exports = mongoose.model("Login", UserSchema);