var express = require("express");
var path = require("path");
const MongoClient = require("mongodb").MongoClient;
var logger = require("morgan");
const fs = require("fs");



var mongooseMorgan = require("mongoose-morgan");
const uaaRouter = require("./middlewares/uaa");

var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
// const plaidRouter = require("./routes/pliad");
var app = express();
const env = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4000;
const database = process.env.database;
const url = process.env.url;

// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
const client = new MongoClient(url, { useUnifiedTopology: true });
let db;


app.use("/", function (req, res, next) {
  //console.log("req.url", req.url);
  if (!db) {
    console.log("connecting to mongoDB");
    client.connect(function (err) {
      db = client.db(database);
      req.db = db;
      next();
    });
  } else {
    req.db = db;
    next();
  }
});



app.use(cors());
// app.use(uaaRouter.checkToken);
app.use("/", authRouter);
app.use("/users", usersRouter);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: "error" });
});

// module.exports = app;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
