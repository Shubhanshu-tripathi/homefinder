const express = require('express')
const dbConnection = require('./db/dbConnect')
require("dotenv").config()
const app = express()
PORT = process.env.PORT || 3000
dbConnection()
app.use(express.json())
app.listen(PORT, () => {
    
 
    console.log("SERVER IS RUNNING ...");

})

app.use("/user", require("./routes/user"))
app.use("/room", require("./routes/room"))
app.use("/book", require("./routes/book"))

