import "./config/config.js"

import express from "express";
import { Router } from "express";
import cors from "cors"
//routers
import test from './routes/test.js'
import signup from './routes/signup.js'
import login from './routes/login.js'

const app = express();

//middleware
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173"
    }));

//app use
app.use('/api/', test)
app.use('/api/signup', signup)
app.use('/api/login', login)

app.listen(process.env.PORT, (req, res) => {
    console.log(
        "server listening on port :" + process.env.PORT
    )
})



