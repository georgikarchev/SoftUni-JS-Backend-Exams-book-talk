const Book = require("../models/Book");

exports.create = async ({
  title,
  author,
  genre,
  stars,
  image,
  review,
  owner,
}) =>
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

exports.getBook = async (bookId) => await Book.findById(bookId).lean();
// exports.getBook = async (bookId) => await Book.findById(bookId).populate('wishingList').lean();

exports.wish = async (bookId, userId) => {
  const book = await Book.findById(bookId);
  book.wishingList.push(userId);
  await book.save();
};

exports.edit = async (
  bookId,
  { title, author, genre, stars, image, review, owner }
) =>
  await Book.findByIdAndUpdate(bookId, {
    title,
    author,
    image,
    bookReview: review,
    genre,
    stars,
    wishingList: [],
    owner: owner,
  });

exports.delete = async (bookId) => await Book.findByIdAndDelete(bookId);
