const Book = require("../models/Book");

exports.createReview = async ({ title, author, genre, stars, image, review, owner }) =>
  await Book.create({
    title,
    author,
    image,
    bookReview: review,
    genre,
    stars,
    wishingList: [],
    owner: owner,
  });

exports.catalog = async () => await Book.find().lean();

exports.getBook = async (bookId) => await Book.findById(bookId).populate('wishingList').lean();