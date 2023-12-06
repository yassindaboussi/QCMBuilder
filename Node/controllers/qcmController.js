const axios = require('axios');
const cheerio = require('cheerio');
const QCM = require('../models/qcmModel');


exports.ExtractQcm = async (req, res) => {
    const mainUrl = req.query.url;
    const course = req.query.course;
    const chapter = req.query.chapter;

    try {
      const response = await axios.get(mainUrl);
      const $ = cheerio.load(response.data);
  
      const titleElement = $('h1[style="text-align: center;padding-top:30px;padding-bottom:10px;"]');
      //const chapter = titleElement.text().trim();
  
      const mcqs = [];
  
      $('.mcq').each((index, element) => {
        const question = $(element).find('.ques').text().trim().replace(/^\d+\.\s*/, '');
        const options = $(element).next('.options').text().trim();
  
        const answerText = $(element).nextAll('.showanswer').first().contents().get(0).nodeValue;
        const answer = answerText.split(":")[1].trim();
        const explanation = $(element).nextAll('.showanswer').first().find('p').text().replace("Explanation:", "").trim();
  
        mcqs.push({
          question,
          options,
          answer,
          explanation
        });
      });
  
      const existingQCM = await QCM.findOne({
        chapter,
        quizzes: {
          $elemMatch: {
            question: mcqs.map(mcq => mcq.question),
            options: mcqs.map(mcq => mcq.options),
            answer: mcqs.map(mcq => mcq.answer),
            explanation: mcqs.map(mcq => mcq.explanation),
          }
        }
      });
  
      if (existingQCM) {
        return res.json({ message: 'QCM for this chapter already exist' });
      }
  
      const quizData = new QCM({
        course: course,
        chapter: chapter,
        quizzes: mcqs
      });
  
      await quizData.save();
  
      res.json({ message: 'Scraped and saved to MongoDB' });
    } catch (error) {
      console.error('Error scraping or saving:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  



exports.GenerateQcm = async (req, res) => {
    const courseName = req.query.course;
    const chapterName = req.query.chapter;

    try {
        const qcms = await QCM.find({
            course: { $regex: courseName, $options: 'i' },
            chapter: { $regex: chapterName, $options: 'i' }
        });

        if (qcms.length === 0) {
            return res.status(404).json({ message: 'No QCM found for the specified course and chapter.' });
        }

        res.status(200).json({ qcms });
    } catch (error) {
        console.error('Error retrieving QCM', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

