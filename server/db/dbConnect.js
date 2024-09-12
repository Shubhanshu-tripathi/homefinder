const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URL;
const dbConnection = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;

