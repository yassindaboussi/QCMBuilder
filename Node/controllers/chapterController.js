const axios = require('axios');
const cheerio = require('cheerio');
const Chapter = require('../models/ChapterModel'); 

exports.ExtractChaptre = async (req, res) => {
  const courseName = req.query.course; 
  //To fix problem of getting C++ like this C%20%20
  //const OnlyForCPlus = encodeURIComponent(courseName).replace(/%2B/g, '+').replace(/%20/g, '+');
  //console.log("encodedCourseName ====>>>> ",OnlyForCPlus)
  let url;

  if (courseName.toLowerCase() === 'c') {  
    url = 'https://letsfindcourse.com/technical-questions/c/history-about'; // 1ére
  }else if (courseName.toLowerCase() === 'linux') {
    url = 'https://letsfindcourse.com/technical-questions/unix-mcq/unix-mcq-questions'; // 1ére
  }
  else if (courseName.toLowerCase() === 'cpp') {
    url = 'https://letsfindcourse.com/technical-questions/cplusplus/oops'; // 2éme
  }else if (courseName.toLowerCase() === 'php') {
    url = 'https://letsfindcourse.com/technical-questions/php-questions-answers/php-mcq-questions'; // 2éme
  }else if (courseName.toLowerCase() === 'html') {
    url = 'https://letsfindcourse.com/technical-questions/html-mcq/html-mcq-questions-answers'; // 2éme
  }else if (courseName.toLowerCase() === 'javascript') {
    url = 'https://letsfindcourse.com/technical-questions/javascript-mcq/javascript-mcq-questions'; // 2éme
  }else if (courseName.toLowerCase() === 'css') {
    url = 'https://letsfindcourse.com/css-mcq-questions/css-mcq-questions-and-answers'; // 2éme
  } else if (courseName.toLowerCase() === 'java') {
    url = 'https://letsfindcourse.com/technical-questions/java-mcq/history'; // 3éme
  } else if (courseName.toLowerCase() === 'python') {
    url = 'https://letsfindcourse.com/technical-questions/python-mcq-questions/history-and-about'; // 3éme
  }
  else {
    return res.status(400).send('Invalid course name');
  }

  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const firstTopicElement = $('ul.toc.chapter.topic:first');
    const baseUrl = url.substring(0, url.lastIndexOf('/'));

    const chapters = [];

    firstTopicElement.find('li a').each((linkIndex, linkElement) => {
      if (linkIndex === 0) {
        return;
      }

      const chapter = $(linkElement).text().trim();
      const url = $(linkElement).attr('href');
      const completeUrl = url.startsWith('http') ? url : `${baseUrl}/${url}`;

      chapters.push({
        chapter,
        url: completeUrl
      });
    });

    const courseData = {
      course: courseName,
      chapters
    };

    const existingChapter = await Chapter.findOne({ course: courseName });
    if (existingChapter) {
      return res.send('Data already exists in the database');
    }

    const newChapter = new Chapter(courseData);
    await newChapter.save();

    res.send('Data fetched and saved successfully');
  } catch (error) {
    console.error('Error fetching and saving data:', error);
    res.status(500).send('An error occurred');
  }
};


exports.GetAllChapters = async (req, res) => {
  const courseName = req.query.course;

  try {
    const chapters = await Chapter.findOne({ course: { $regex: courseName, $options: 'i' } });
    
    if (!chapters) {
      return res.status(404).json({ message: 'Chapters not found for the given course' });
    }

    res.json(chapters);
  } catch (error) {
    console.error('Error retrieving chapters:', error);
    res.status(500).send('An error occurred');
  }
};
