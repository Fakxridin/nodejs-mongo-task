const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Yangi kitob qo'shish (Create)
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Barcha kitoblarni olish (Read All)
router.get('/', async (req, res) => {
  try {
    const { title, author, category } = req.query;
    const filter = {};

    if (title) {
        filter.title = new RegExp(title, 'i'); 
    }

    if (author) {
        filter.author = author; 
    }

    if (category) {
        filter.category = category; 
    }

    const books = await Book.find(filter).populate('author', 'name').populate('category', 'name');
     
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ma'lum bir kitobni olish (Read by ID)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author category');
    if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kitobni yangilash (Update)
router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    // Ensure author and category references are updated
    const updatedData = {
      ...req.body,
      author: req.body.author,
      category: req.body.category
    };

    const book = await Book.findByIdAndUpdate(req.params.id, updatedData, { new: true })
                           .populate('author', 'name')
                           .populate('category', 'name');
    if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
    
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Kitobni o'chirish (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Kitob topilmadi' });
    res.status(200).json({ message: 'Kitob muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
