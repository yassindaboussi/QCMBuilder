const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://letsfindcourse.com/technical-questions/c/history-about';

axios.get(url)
  .then(response => {
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const firstTopicElement = $('ul.toc.chapter.topic:first');

    const baseUrl = url.substring(0, url.lastIndexOf('/'));

    firstTopicElement.find('li a').each((linkIndex, linkElement) => {
      if (linkIndex === 0) {
        return;
      }

      const chapter = $(linkElement).text().trim();
      const url = $(linkElement).attr('href');

      const completeUrl = url.startsWith('http') ? url : `${baseUrl}/${url}`;
      console.log(chapter);
      console.log(completeUrl);
    });
  })
  .catch(error => {
    console.error('Error fetching URL:', error);
  });
