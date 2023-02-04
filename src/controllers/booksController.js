const router = require('express').Router();

router.get("/books", function (req, res) {
  res.render('catalog');
});

router.get("/books/create", function (req, res) {
  res.render('create');
});

router.get("/books/details", function (req, res) {
  res.render('details');
});

router.get("/books/edit", function (req, res) {
  res.render('edit');
});

module.exports = router;