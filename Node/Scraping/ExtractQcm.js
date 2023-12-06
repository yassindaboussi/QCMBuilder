const axios = require('axios');
const cheerio = require('cheerio');

const mainUrl = 'https://letsfindcourse.com/technical-questions/dbms-sql-mcq/dbms-basic';

axios.get(mainUrl)
  .then(response => {
    const $ = cheerio.load(response.data);

    // Extract title using your original code
    const titleElement = $('h1[style="text-align: center;padding-top:30px;padding-bottom:10px;"]');
    const chaptre = titleElement.text().trim();
    console.log('Chaptre:', chaptre);

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

    mcqs.forEach((mcq, index) => {
      console.log('Question:', mcq.question);
      console.log('Options:', mcq.options);
      console.log('Answer:', mcq.answer);
      console.log('Explanations:', mcq.explanation);
      console.log('\n');
    });
  })
  .catch(error => {
    console.error('Error fetching the URL:', error);
  });
