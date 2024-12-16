const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add a new book
router.get('/add', (req, res) => {
  res.render('addBook');
});

router.post('/add', async (req, res) => {
  const { title, author, rating, review } = req.body;
  const newBook = new Book({ title, author, rating, review });
  try {
    await newBook.save();
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Edit a book
router.get('/edit/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('editBook', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, author, rating, review } = req.body;
  try {
    await Book.findByIdAndUpdate(req.params.id, { title, author, rating, review });
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a book
router.get('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
