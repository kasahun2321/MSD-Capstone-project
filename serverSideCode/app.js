var express = require("express");
var path = require("path");
var logger = require("morgan");
const fs = require("fs");


var usersRouter = require("./routes/users");

var app = express();
const env = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4000;

// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



app.use(cors());
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
