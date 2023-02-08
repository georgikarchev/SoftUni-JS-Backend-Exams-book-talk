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
  res.locals.book = { title, author, genre, stars, image, review };

  if(title.length < 2) {
    res.locals.error = "The Title should be at least 2 character";
    return res.render('create');
  }

  if(author.length < 5) {
    res.locals.error = "The Author should be at least 5 characters";
    return res.render('create');
  }

  if(genre.length < 3) {
    res.locals.error = "The Genre should be at least 3 characters";
    return res.render('create');
  }

  if(stars < 1 || stars > 5) {
    res.locals.error = "The Stars should be a positive number between 1 and 5";
    return res.render('create');
  }

  if(!(image.startsWith('http://') || image.startsWith('https://'))) {
    res.locals.error = "The Image should start with http:// or https://";
    return res.render('create');
  }

  if(review.length < 10) {
    res.locals.error = "The Review should be a minimum of 10 characters long.";
    return res.render('create');
  }

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
  res.locals.book = book
  res.render("edit");
});

router.post("/:bookId/edit", isAuth, async function (req, res) {
  const bookId = req.params.bookId;
  const { title, author, genre, stars, image, review } = req.body;
  res.locals.book = { title, author, genre, stars, image, bookReview: review };

  if(title.length < 2) {
    res.locals.error = "The Title should be at least 2 character";
    return res.render('edit');
  }

  if(author.length < 5) {
    res.locals.error = "The Author should be at least 5 characters";
    return res.render('edit');
  }

  if(genre.length < 3) {
    res.locals.error = "The Genre should be at least 3 characters";
    return res.render('edit');
  }

  if(stars < 1 || stars > 5) {
    res.locals.error = "The Stars should be a positive number between 1 and 5";
    return res.render('edit');
  }

  if(!(image.startsWith('http://') || image.startsWith('https://'))) {
    res.locals.error = "The Image should start with http:// or https://";
    return res.render('edit');
  }

  if(review.length < 10) {
    res.locals.error = "The Review should be a minimum of 10 characters long.";
    return res.render('edit');
  }

  try {
    const editedBook = await bookService.edit(bookId, {
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
