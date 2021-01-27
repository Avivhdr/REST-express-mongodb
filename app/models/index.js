const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig?.url;
db.items = require("./item.model.js")(mongoose);

module.exports = db;
