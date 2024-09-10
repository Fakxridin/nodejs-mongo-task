const {Schema, model} = require('mongoose');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  biography: {
    type: String
  },
}, { timestamps: true });

module.exports = model('Author', authorSchema);
