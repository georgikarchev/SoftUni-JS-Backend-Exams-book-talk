const router = require('express').Router();

router.get("/users/register", function (req, res) {
  res.render('register');
});

router.get("/users/login", function (req, res) {
  res.render('login');
});

router.get("/users/profile", function (req, res) {
  res.render('profile');
});

router.get("/users/logout", function (req, res) {
  res.send('logout');
});

module.exports = router;