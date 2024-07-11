const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URL;
const dbConnection = async () => {
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;

