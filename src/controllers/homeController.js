const router = require("express").Router();

router.get("/", function (req, res) {
  res.locals.title = 'Books Store Home';
  res.render('home');
});

router.get("/404", function (req, res) {
  res.locals.title = 'Nothing Found';
  res.render('404');
});

module.exports =  router;