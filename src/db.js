const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.4yxbc1e.mongodb.net/?retryWrites=true&w=majority`);

    console.log("Base Conectada");
}

main().catch((err) =>  console.log(err));

module.exports = main;