const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRoutes = require('./routes/login.js');

require("dotenv").config();
require("./db");

const port = process.env.PORT || 3000;


const pictureRouter = require("./routes/picture.js");

app.use("/pictures", pictureRouter);


app.use(bodyParser.json());

app.use("/login", loginRoutes);


app.listen(port, () =>{
    console.log(`Servidor ON!! na Porta ${port}`);
});
