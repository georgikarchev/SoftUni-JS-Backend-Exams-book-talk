const router = require('express').Router();

router.get("/", function (req, res) {
  res.render('home');
});

router.get("/register", function (req, res) {
  res.render('register');
});

router.get("/login", function (req, res) {
  res.render('login');
});

router.get("/catalog", function (req, res) {
  res.render('catalog');
});

router.get("/profile", function (req, res) {
  res.render('profile');
});

router.get("/reviews/create", function (req, res) {
  res.render('create');
});

router.get("/reviews/details", function (req, res) {
  res.render('details');
});

router.get("/reviews/edit", function (req, res) {
  res.render('edit');
});

router.get("/logout", function (req, res) {
  res.send('logout');
});

router.get("/404", function (req, res) {
  res.render('404');
});



module.exports = router;