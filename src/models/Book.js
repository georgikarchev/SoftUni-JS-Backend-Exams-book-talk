const { Schema, model, Types } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  bookReview: { type: String, required: true },
  genre: { type: String, required: true, min:1, max: 5 },
  stars: { type: Number, required: true },
  wishingList: [{ type: Types.ObjectId, ref: "User" }],
  owner: { type: Types.ObjectId, ref: "User" },
});

const Book = model('Book', bookSchema);

module.exports = Book;