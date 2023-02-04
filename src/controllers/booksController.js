const router = require('express').Router();

router.get("/", function (req, res) {
  res.render('catalog');
});

router.get("/create", function (req, res) {
  res.render('create');
});

router.get("/details", function (req, res) {
  res.render('details');
});

router.get("/edit", function (req, res) {
  res.render('edit');
});

module.exports = router;