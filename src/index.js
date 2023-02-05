// The app needs the following packages

// express
// express-handlebars
// jsnonwebtoken
// cookie-parser
// bcrypt
// mongoose

const express = require("express");
const { engine } = require('express-handlebars');


const router = require('./routes');

// console.log(engine);

const app = express();

app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(router);

const config = {
  PORT: 3000,
};



app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});