const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static('uploads'))
const errorMiddleware = require("./middlerware/error");

//Route imports
const user = require("./Routes/userRoutes")
const post = require('./Routes/postRoutes')
const team = require('./Routes/teamRoutes.js')
const alumni = require('./Routes/alumniRoutes.js')

app.use("/api",post)
app.use("/api",team)
app.use("/api",user)
app.use("/api",alumni)

//Middleware for error 
app.use(errorMiddleware)

module.exports = app;