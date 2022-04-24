const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const articleController = require('../controllers/ArticleController')
const exchangeController = require('../controllers/ExchangeRateController')
const { check } = require("express-validator");
const parser_ria = require('../utils/parser_ria');
const parser_rbk = require('../utils/parser_rbk');
const parser_vesti = require('../utils/parser_vesti');

router.route('/').get(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  let text = 'Hello, World!'
  return res.send(`<p>${text}</p>`)
})


router.route('/get_news').post(articleController.getLastArticles.bind(articleController))

router.route('/get_ria').post(async (req, res) => {
  let result = await parser_ria('https://ria.ru/export/rss2/archive/index.xml')

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res
    .send(result)
})

router.route('/get_rbk').post(async (req, res) => {
  let result = await parser_rbk('http://static.feed.rbc.ru/rbc/logical/footer/news.rss')

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res
    .send(result)
})

router.route('/get_vesti').get(async (req, res) => {
  let result = await parser_vesti('https://www.vesti.ru/vesti.rss')

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res
    .send(result)
})

router.route('/login').post(userController.login);
router.route('/register').post(userController.register,
  [
    check('email').isEmail(),
    check('password').isLength({ min: 8, max: 128 }),
    check('login').isLength({ min: 6, max: 16 }),
    check('login').not().contains('@').withMessage('Логин не должен содержать символ @'),
    check('password').custom((value) => {
      if (value == value.toLowerCase()) {
        throw new Error('Password must contain at least one upper case letter')
      }
      if (value == value.toUpperCase()) {
        throw new Error('Password must contain at least one lower case letter')
      }
      if (value.search(/\d/) == -1) {
        throw new Error('Password must contain at least one digit')
      }
      if (value.search(/[^a-zA-Z0-9а-яА-Я]]/) == -1) {
        throw new Error('Password must contain at least one special character')
      }
      if (value.search(/[a-zA-Z0-9а-яА-Я]/) == -1) {
        throw new Error('Password must contain at least one cyrillic or latin letter')
      }
      return true
    })
  ]
  );
router.route('/last-exchange-rates').post(exchangeController.getLastExchangeRates.bind(exchangeController));
router.route('/isAdmin').post(userController.isAdmin.bind(userController));
router.route('/get-user-info').post(userController.getUser.bind(userController));
module.exports = router;