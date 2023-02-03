const express = require("express");
const app = express();

const config = {
  PORT: 5050,
};

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});