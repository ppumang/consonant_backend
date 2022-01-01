const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/cosonant";
const fs = require("fs");
const path = require("path");
const collections = fs.readdirSync(path.join(__dirname, "Schemas"));
console.log("process.env.NODE_ENV =>", process.env.NODE_ENV);

exports.connect = function () {
    const db = mongoose.createConnection(uri);
    for (let i = 0; i < collections.length; i++) {
        const collection = require(path.join(__dirname, "Schemas", collections[i])).collection;
        console.log("db connect =>", collection.name);
        db.model(collection.name, collection.schema);
    }
    return db;
};
