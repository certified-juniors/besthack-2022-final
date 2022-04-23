const rp = require('request-promise');
const cheerio = require('cheerio');

const parser = () => {

  const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
  rp(url)
  .then(function(html){
    let $ = cheerio.load(html)

    console.log($('big > a', html).length);
    console.log($('big > a', html).text());
  })
  .catch(function(err){
    // Ошибка
  })
}

module.exports = parser