const express = require("express");
const app = express();
const loginRoutes = require('./routes/login.js');
const pictureRouter = require("./routes/picture.js");
const createUserRouter = require("./routes/createUser.js");
require("dotenv").config();
require("./db");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/pictures", pictureRouter);

app.use("/create", createUserRouter);

app.use("/login", loginRoutes);


app.listen(port, () =>{
    console.log(`Servidor ON!! na Porta ${port}`);
});
