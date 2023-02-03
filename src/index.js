const express = require("express");
const { engine } = require('express-handlebars');

// console.log(engine);

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.static('public'));

const config = {
  PORT: 3000,
};

app.get("/", function (req, res) {
  res.render('home');
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});