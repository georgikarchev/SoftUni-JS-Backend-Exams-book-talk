const router = require('express').Router();

router.get("/register", function (req, res) {
  res.render('register');
});

router.get("/login", function (req, res) {
  res.render('login');
});

router.post("/login", function (req, res) {
  const {email, password} = req.body;

  if(email !== 'gogo@gogo.com') {
    // error 
  }

  res.redirect('/books');
});

router.get("/profile", function (req, res) {
  res.render('profile');
});

router.get("/logout", function (req, res) {
  res.send('logout');
});

module.exports = router;