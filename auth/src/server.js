require('dotenv').config();
require('./connections/mongodb.connection')();
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const { port, appVersion } = require('./config').app;

const app = express()

app.use((req, _res, next) => {
    req.start = new Date().getTime()
    next()
})
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(morgan("dev"))
    .use(`/api/${appVersion}/auth`, require("./routes/user.route")(express))
    .use((req, res, next) => {
        res.status(404).json({
            message: "Route not Found",
            data: null,
            timings: `${new Date().getTime() - req.start} ms`,
            timeStamps: `${new Date().toLocaleTimeString()} ©`
        })
    })


    .listen(port, () => {
        console.log(`Auth service listening on port ${port}`)
    })