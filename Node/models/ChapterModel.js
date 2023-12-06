const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  course: String,
  chapters: [
    {
      chapter: String,
      url: String
    }
  ]
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
