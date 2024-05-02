//Creating DB connection
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDb = require("./database/db");

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoDb.datab, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

//server
const bookRoute = require("./node-backend/routes/book_routes");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

//static path
app.use(express.static(path.join(__dirname, "dist/BookStore")));

//API root
app.use("/api", bookRoute);

//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening Port on: " + port);
});

// Handling 404 Error
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

// Base route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

// Handling Errors
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Catch-all route for Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/BookStore/index.html"));
});
