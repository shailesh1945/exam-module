require('dotenv').config();
const connectDB = require('./config/db');
const Question = require('./models/Question');

const sample = [
  {
    text: 'What is the capital of France?',
    options: [
      { key: 'A', text: 'Berlin' },
      { key: 'B', text: 'Madrid' },
      { key: 'C', text: 'Paris' },
      { key: 'D', text: 'Rome' }
    ],
    correctOptionKey: 'C'
  },
  {
    text: '2 + 2 equals?',
    options: [
      { key: 'A', text: '3' },
      { key: 'B', text: '4' },
      { key: 'C', text: '5' },
      { key: 'D', text: '22' }
    ],
    correctOptionKey: 'B'
  },
  {
    text: 'React is a library for building ____?',
    options: [
      { key: 'A', text: 'Operating systems' },
      { key: 'B', text: 'Mobile apps only' },
      { key: 'C', text: 'User interfaces' },
      { key: 'D', text: 'Databases' }
    ],
    correctOptionKey: 'C'
  }
  // add more to reach desired count
];

(async () => {
  try {
    await connectDB();
    await Question.deleteMany({});
    await Question.insertMany(sample);
    console.log('Seeded questions');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
