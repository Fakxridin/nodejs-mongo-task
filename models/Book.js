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
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true // Make it required if every book should be associated with a user
  }
}, { timestamps: true });

module.exports = model('Book', bookSchema);
