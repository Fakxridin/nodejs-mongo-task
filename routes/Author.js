const express = require('express');
const router = express.Router();
const Author = require('../models/Author');


// POST /authors - Yangi muallif qo'shish
router.post('/', async (req, res) => {
  try {
    const { name, biography } = req.body;
    const newAuthor = new Author({ name, biography });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /authors - Barcha mualliflarni ro'yxatini olish
router.get('/', async (req, res) => {
  const { name } = req.query;
  const filter = {};

  if (name) {
    filter.name = new RegExp(name, 'i'); 
  }

  try {
    const authors = await Author.find(filter); 
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET /authors/:id - Ma'lum bir muallifni olish
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Muallif topilmadi' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /authors/:id - Muallifni yangilash
router.put('/:id', async (req, res) => {
  try {
    const { name, biography } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, biography },
      { new: true, runValidators: true }
    );
    if (!updatedAuthor) return res.status(404).json({ message: 'Muallif topilmadi' });
    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /authors/:id - Muallifni o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Muallif topilmadi' });
    res.json({ message: 'Muallif muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
