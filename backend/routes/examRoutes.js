const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getRandomQuestions,
  submitExam,
  getResult,
  getMyResults
} = require('../controllers/examController');

router.get('/questions', auth, getRandomQuestions);
router.post('/submit', auth, submitExam);
router.get('/result/:id', auth, getResult);
router.get('/my-results', auth, getMyResults);

module.exports = router;
