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
