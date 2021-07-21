var express = require("express");
var path = require("path");
var helmet = require("helmet");
var cors = require("cors");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();

app.use(helmet());
app.use(cors());
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/api/", indexRouter);

module.exports = app;
