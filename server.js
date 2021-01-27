const express = require("express");
// Security
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
// Request handling
const compression = require('compression');
const cors = require('cors');

const app = express();
app.use(helmet()); // set security HTTP headers
app.use(express.json()); // parse json request body
app.use(xss()); // sanitize request data
app.use(mongoSanitize()); // ↑
app.use(compression()); // gzip compression
app.use(cors()); // enable cors
app.options('*', cors()); // ↑

const db = require("./app/models/");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/item.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "App listening" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
