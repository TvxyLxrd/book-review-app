const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  dateRead: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
