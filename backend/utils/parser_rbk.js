const request = require("request-promise");
const cheerio = require("cheerio");

const parser_rbk = async (url) => {
  return new Promise((resolve, reject) => {
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
        $('channel').find('item').each((i, el) => {
          result[i] = {
            title: $(el).find('title').text(),
            link: $(el).find('link').text().split('\n')[0],
            description: $(el).find('description').text(),
            date: $(el).find('pubDate').text()
          }
        })
        resolve(result)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

const pageContent_parser_rbk = async (url) => {
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
        let text = $('.article__content').find('p').text();
        text = text.split('.').map((s) => s.trim()).join('. ');
        resolve(text)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

module.exports = [parser_rbk, pageContent_parser_rbk]