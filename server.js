const express = require("express");
const app = express();
const db = require("./mongo/index").connect();
const fs = require("fs");
const path = require("path")
const cors = require("cors");

exports.db = db;
exports.app = app;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3005');
    const allowedOrigins = ['*'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

let endpoints = fs.readdirSync(path.join(__dirname, "router"));
endpoints = endpoints.map(x => x.split(".")[0]);
for (let endpoint of endpoints) {
    console.log({ endpoint })
    app.use(`/${endpoint}`, require(`./router/${endpoint}`));
}


app.listen(8080, () => {
    console.log("listening on port:", 8080);
});
