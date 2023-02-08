const router = require("express").Router();

const { AUTH_COOKIE_NAME } = require("../constants");
const authService = require("../services/authService");
const { isGuest, isAuth } = require("../middlewares/authMiddleware");

router.get("/register", isGuest, function (req, res) {
  res.locals.title = "Register page";
  res.render("register");
});

router.post("/register", isGuest, async function (req, res) {
  // console.log('Register action');
  const { email, username, password, repassword } = req.body;
  // console.log({ email, username, password, repassword });

  // check if pass === repass
  if (password !== repassword) {
    return res.render("register", { error: "The repeat password should be equal to the password" });
  }

  // check if password length is >= 3 characters
  if(password.length < 3) {
    return res.render("register", { error: "The password should be at least 3 characters long" });
  }

  // check if password length is >= 10 characters
  if(email.length < 10) {
    return res.render("register", { error: "The email should be at least 10 characters long" });
  }

  try {
    const token = await authService.register({ email, username, password });
    res.cookie(AUTH_COOKIE_NAME, token);
    return res.redirect("/");
  } catch (error) {
    res.locals.title = "Register page | Error";
    // res.locals.error = error.message;
    return res.render("register", { error: error.message });
  }
});

router.get("/login", isGuest, function (req, res) {
  res.render("login");
});

router.post("/login", isGuest, async function (req, res) {
  const { email, password } = req.body;

  // check if password length is >= 3 characters
  if(password.length < 3) {
    return res.render("login", { error: "The password should be at least 3 characters long" });
  }

  // check if password length is >= 10 characters
  if(email.length < 10) {
    return res.render("login", { error: "The email should be at least 10 characters long" });
  }

  try {
    // TODO: (inService) find user in DB -> Check password match -> create jwt and return it
    const token = await authService.login({ email, password });
    console.log(token);
    // save token in cookie
    // TODO - WHY is it not working when I use AUTH_COOKIE_NAME -> there was a typo "AUTH_COOKIE_NAME;" - the semicolon is obviously not allowed
    res.cookie(AUTH_COOKIE_NAME, token);
    res.redirect("/books");
  } catch (error) {
    res.render("login", { error: error.message });
  }
});

router.get("/profile", isAuth, function (req, res) {
  res.render("profile");
});

router.get("/logout", isAuth, function (req, res) {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect("/");
});

module.exports = router;
