require("dotenv").config();

const express=require("express")
const app=express()
const cookieParser = require("cookie-parser");
const cors=require('cors')
const Authrouter=require('./routes/auth')
const requestRouter=require('./routes/requests')
const profilerouter=require('./routes/profile')
app.use(cookieParser());
require("dotenv").config();
app.use(cors())
// Without this, req.body 
// will be undefined when you send JSON from Postman.
app.use(express.json())

app.use('/',Authrouter)
app.use('/',profilerouter)
app.use('/',requestRouter)


app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});