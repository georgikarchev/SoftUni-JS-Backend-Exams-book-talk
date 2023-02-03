const express = require("express");
const { engine } = require('express-handlebars');


const router = require('./routes');

// console.log(engine);

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(router);

const config = {
  PORT: 3000,
};



app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});