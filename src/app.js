const express = require("express");
const app = express();

require("dotenv").config();
require("./db");

const port = process.env.PORT || 3000;

const pictureRouter = require("./routes/picture.js");

app.use("/pictures", pictureRouter);


app.listen(port, () =>{
    console.log(`Servidor ON!! na Porta ${port}`);
});
