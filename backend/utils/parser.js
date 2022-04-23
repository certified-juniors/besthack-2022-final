const request = require('request-promise');
const cheerio = require('cheerio');

const parser = (url) => {
  const options = {
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0'
    },
  }
  request(options)
  .then(function(html){
    let $ = cheerio.load(html)

    console.log($('description').nextAll().map( (i, el) => {
      if ('text' in el)
        el.text()
    }))
    // console.log($('title').find('title').text())
  })
  .catch(function(err){
    console.log('error', err)
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

const pageContent_parser_ria = async (url) => {
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

const pageContent_parser_vesti = async (url) => {
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
        let text = $('.article__text').find('p').text();
        console.log(text)
        text = text.split('.').map((s) => s.trim()).join('. ');
        resolve(text)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}


module.exports = [parser, parser_currency, pageContent_parser_vesti]