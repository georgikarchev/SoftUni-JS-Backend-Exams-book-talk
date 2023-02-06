const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');

const bookService = require('../services/bookService');

router.get("/", function (req, res) {
  const books = null;
  res.render('catalog', { title: "Books catalog",  books});
});

// the isAuth middleware is passed before the action and acts as a route guard
router.get("/create", isAuth, function (req, res) {
  res.render('create');
});

router.post("/create", isAuth, async function (req, res) {
  const {title, author, genre, stars, image, review} = req.body;

  try { 
    const newBook = await bookService.createReview({title, author, genre, stars, image, review, owner: req.user._id});
    res.redirect('/books');
  } catch (error) {
    console.log(error.message);
    res.locals.error = "Could not create book review";
    res.render('create')
  }
});

router.get("/details", function (req, res) {
  res.render('details');
});

router.get("/edit", isAuth, function (req, res) {
  res.render('edit');
});

module.exports = router;