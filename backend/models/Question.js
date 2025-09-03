const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // options is array of objects { key: 'A', text: '...' } or simple array
  options: [
    {
      key: String,
      text: String
    }
  ],
  correctOptionKey: { type: String, required: true }, // e.g., 'A'
  marks: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
