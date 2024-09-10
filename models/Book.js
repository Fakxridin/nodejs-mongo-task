const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Author', 
    required: true 
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  publishedYear: {
    type: Number,
  },
  summary: {
    type: String,
  },
}, { timestamps: true });

module.exports = model('Book', bookSchema);
