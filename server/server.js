const express = require('express')
const dbConnection = require('./db/dbConnect')
require("dotenv").config()
const cors = require('cors');
const app = express()
app.use(cors());
PORT = process.env.PORT || 3000
dbConnection()
app.use(express.json())
app.listen(PORT, () => {
    
 
    console.log(`SERVER IS RUNNING ON PORT ${PORT}...`); 

})

app.use("/user", require("./routes/user"))
app.use("/room", require("./routes/room"))
app.use("/book", require("./routes/book"))

