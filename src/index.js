// The app needs the following packages

// express
// express-handlebars
// jsnonwebtoken
// cookie-parser
// bcrypt
// mongoose

const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { PORT } = require("./constants");
const { auth } = require("./middlewares/authMiddleware");

const router = require("./routes");

const app = express();

app.engine("hbs", engine({ extname: "hbs" }));
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: false })); // body parser - responsible for extracting data from post requests / ? only post requests
app.use(cookieParser()); // cookieParser() must be called as a function - otherwise server does not return a response
app.use(auth);
app.use(router);

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/SoftUni-JS-Backend-Exams-book-talk")
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
