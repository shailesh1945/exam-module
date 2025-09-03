const Question = require('../models/Question');
const Result = require('../models/Result');
const mongoose = require('mongoose');

// GET /api/exam/questions?count=20
exports.getRandomQuestions = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 20;

    // Use aggregation to get random questions
    const questions = await Question.aggregate([{ $sample: { size: count } }]);

    // Remove correctOptionKey before sending to client
    const sanitized = questions.map(q => ({
      _id: q._id,
      text: q.text,
      options: q.options,
      marks: q.marks
    }));

    res.json(sanitized);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// POST /api/exam/submit
// body: { answers: [{ questionId, selectedOptionKey }], durationSeconds: number }
exports.submitExam = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers)) return res.status(400).json({ message: 'Answers must be an array' });

    const questionIds = answers.map(a => new mongoose.Types.ObjectId(a.questionId));
const questions = await Question.find({ _id: { $in: questionIds } });

    // Map question id -> question doc
    const qMap = {};
questions.forEach(q => {
  qMap[q._id.toString()] = q;
});

    let totalQuestions = answers.length;
    let correctAnswers = 0;
    let score = 0;
    const detailedAnswers = [];

    answers.forEach(a => {
      const q = qMap[a.questionId.toString()];
      if (!q) {
        detailedAnswers.push({
          question: a.questionId,
          selectedOptionKey: a.selectedOptionKey,
          correctOptionKey: null,
          isCorrect: false,
          marks: 0
        });
        return;
      }
      const isCorrect = q.correctOptionKey === a.selectedOptionKey;
      if (isCorrect) {
        correctAnswers += 1;
        score += q.marks || 1;
      }
      detailedAnswers.push({
        question: q._id,
        selectedOptionKey: a.selectedOptionKey,
        correctOptionKey: q.correctOptionKey,
        isCorrect,
        marks: isCorrect ? (q.marks || 1) : 0
      });
    });

    const result = new Result({
      user: req.user._id,
      totalQuestions,
      correctAnswers,
      score,
      answers: detailedAnswers
    });
    await result.save();

    res.json({
      resultId: result._id,
      totalQuestions,
      correctAnswers,
      score,
      answers: detailedAnswers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /api/exam/result/:id
exports.getResult = async (req, res) => {
  try {
    const resultId = req.params.id;
    const result = await Result.findById(resultId).populate('answers.question', 'text options');
    if (!result) return res.status(404).json({ message: 'Result not found' });
    // ensure only owner can access
    if (result.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /api/exam/my-results
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
