const request = require('request-promise');
const cheerio = require('cheerio');

const parser_ria = (url) => {
    const options = {
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0'
      },
    }
    request(options)
      .then(function(html) {
        let result = []
        let $ = cheerio.load(html, {decodeEntities: false, xmlMode: true})
        console.log($('title').text())
        $('channel').find('item').each( (i, el) => {
          result[i] = {
            title: $(el).find('title').text(),
            link: $(el).find('link').text(),
            description: $(el).find('description').text(),
            image: $(el).find('image').text()
          }
          // result[i] = {
          //   ...result,
          //   text: pageContent_parser_ria(result[i].link)
          // }
        })
        console.log(result)
        return result
      })
      .catch(function (err) {
        return err.statusCode
      })
}


const parser_currency = async (cur) => {
  cur = cur.toLowerCase()
  return new Promise((resolve, reject) => {
    let time = Date.now()
    const options = {
      uri: `https://www.finam.ru/quote/forex/eur-${cur}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0'
      },
    }
    request(options)
      .then(function (html) {
        let $ = cheerio.load(html)
        resolve([
          $('.PriceInformation__price--26G', html).text(),
          time
        ]);
      })
      .catch(function (err) {
        reject(err);
      })
  });
}

async function pageContent_parser_ria(url){
  return new Promise((resolve, reject) => {
    const options = {
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0'
      },
    }
    request(options)
      .then(function (html) {
        let $ = cheerio.load(html)
        let text = $('.article__text').text();
        text = text.split('.').map((s) => s.trim()).join('. ');
        resolve(text)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}




module.exports = parser_currency