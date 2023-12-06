const mongoose = require('mongoose');

const quizzSchema = new mongoose.Schema({
  course: String,
  chapter:  String,
  quizzes: [
    {
      question: String,
      options: String,
      answer: String,
      explanation: String
    }
  ]
});

const QCM = mongoose.model('Quizz', quizzSchema);

module.exports = QCM;
