const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Yangi kategoriya qo'shish
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Barcha kategoriyalarni olish
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {};

    if (name) {
      filter.name = new RegExp(name, 'i'); 
    }

    const categories = await Category.find(filter);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ma'lum kategoriya olish
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Kategoriya topilmadi' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kategoriyani yangilash
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Kategoriya topilmadi' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kategoriyani o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Kategoriya topilmadi' });
    res.status(200).json({ message: 'Kategoriya o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
