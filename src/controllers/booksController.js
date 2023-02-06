const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

router.get("/", function (req, res) {
  res.render('catalog');
});

// the isAuth middleware is passed before the action and acts as a route guard
router.get("/create", isAuth, function (req, res) {
  res.render('create');
});

router.get("/details", function (req, res) {
  res.render('details');
});

router.get("/edit", isAuth, function (req, res) {
  res.render('edit');
});

module.exports = router;