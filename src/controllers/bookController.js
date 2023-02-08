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
    const newBook = await bookService.create({
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
    ? book.wishingList.map((x) => x.valueOf()).includes(req.user._id)
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

router.get("/:bookId/wish", isAuth, async function (req, res) {
  const bookId = req.params.bookId;

  try {
    await bookService.wish(bookId, req.user._id);
  } catch (error) {
    console.log(error.message);
    res.locals.error = "Could not add book to wishingList";
    res.render("404");
  }

  res.redirect(`/books/${bookId}/details`);
});

router.get("/:bookId/edit", isAuth, async function (req, res) {
  const bookId = req.params.bookId;
  const book = await bookService.getBook(bookId);
  const isOwner = req.user ? req.user._id == book.owner.valueOf() : false;
  
  if(!isOwner) {
    res.status(401).end();
  }
  
  res.locals.title = `Book Details`;  
  res.render("edit", { book });
});

router.post("/:bookId/edit", isAuth, async function (req, res) {
  const bookId = req.params.bookId;
  const { title, author, genre, stars, image, review } = req.body;

  try {
    const newBook = await bookService.edit(bookId, {
      title,
      author,
      genre,
      stars,
      image,
      review,
      owner: req.user._id,
    });
    res.redirect(`/books/${bookId}/details`);
  } catch (error) {
    console.log(error.message);
    res.locals.error = "Could not edit book review";
    res.locals.book = { title, author, genre, stars, image, review };
    res.render("edit");
  }
});

router.get("/:bookId/delete", isAuth, async function (req, res) {
  const bookId = req.params.bookId;

  try {
    // get book data
    const book = await bookService.getBook(bookId);

    // check if uset is owner
    if (req.user._id != book.owner.valueOf()) {
      res.locals.error = "User is not an owner of the book. Can't delete.";
      res.render("404");
    }

    // delete book
    try {
      await bookService.delete(bookId);
    } catch (error) {
      console.log(error.message);
      res.locals.error = error.message;
      res.render("404");
    }

    res.redirect("/books");
  } catch (error) {
    console.log(error.message);
    res.locals.error = "Could not find a book with that ID";
    res.render("404");
  }
});

module.exports = router;
