// express kutubxonasi
const cors = require('cors')
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
// Import routes
const booksRoute = require('./routes/Book');
const authorsRoute = require('./routes/Author');
const categoriesRoute = require('./routes/Category');

dotenv.config()
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())

app.get('/', (req, res, next) => {
    res.send('Kitoblar Kutubxonasi APIga xush kelibsiz!');
})

// Use routes
app.use('/books', booksRoute);
app.use('/authors', authorsRoute);
app.use('/categories', categoriesRoute);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDBga muvaffaqiyatli ulandi');
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portda ishlamoqda`);
    });
  })
  .catch((error) => {
    console.error('MongoDBga ulanishda xato:', error);
  });