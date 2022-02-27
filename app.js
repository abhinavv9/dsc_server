const express = require("express");
const app = express();

app.use(express.json());
app.use('/uploads',express.static('uploads'))

const errorMiddleware = require("./middlerware/error");

//Route imports
const post = require('./Routes/postRoutes')
const team = require('./Routes/teamRoutes.js')
const alumni = require('./Routes/alumniRoutes.js')

app.use("/api",post)
app.use("/api",team)
app.use("/api",alumni)

//Middleware for error 
app.use(errorMiddleware)

module.exports = app;