const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");

const bookService = require("../services/bookService");

router.get("/", async function (req, res) {
  const books = await bookService.catalog();
  res.render("catalog", { title: "Books catalog", books });
});

// the isAuth middleware is passed before the action and acts as a route guard
router.get("/create", isAuth, function (req, res) {
  res.render("create");
});

router.post("/create", isAuth, async function (req, res) {
  const { title, author, genre, stars, image, review } = req.body;

  try {
    const newBook = await bookService.createReview({
      title,
      author,
      genre,
      stars,
      image,
      review,
      owner: req.user._id,
    });
    res.redirect("/books");
  } catch (error) {
    console.log(error.message);
    res.locals.error = "Could not create book review";
    res.render("create");
  }
});

router.get("/:bookId/details", async function (req, res) {
  const bookId = req.params.bookId;
  const book = await bookService.getBook(bookId);
  res.locals.title = `Book Details`;

  const isInWishingList = req.user
    ? book.wishingList.includes(req.user._id)
    : false;

  const isOwner = req.user ? req.user._id == book.owner.valueOf() : false;
  const isAuthenticated = Boolean(req.user);
  res.render("details", {
    book,
    isOwner,
    isAuthenticated,
    isNotInWishingList: !isInWishingList,
  });
});

router.get("/:bookId//edit", isAuth, function (req, res) {
  res.render("edit");
});

router.get("/:bookId//wish", isAuth, function (req, res) {
  res.render("wish");
});

module.exports = router;
