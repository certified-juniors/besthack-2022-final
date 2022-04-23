const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const exchangeController = require('../controllers/ExchangeRateController')
const { check } = require("express-validator");
const [parser, page_currency, pageContent_parser_ria] = require('../utils/parser');

router.route('/').get(async (req, res) => {

  //parser('https://ria.ru/export/rss2/archive/index.xml')
  let text = await pageContent_parser_ria('https://ria.ru/20220423/ssha-1785101049.html')

  return res
    .status(200)
    .send(`<p>${text}</p>`)
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
      if (value.search(/\[\~\!\@\#\$\%\^\&\*\_\\\-\+\=\'\;\\\{\}\]\:\"\.\ \<\>\,\.\?\ \/]/) == -1) {
        throw new Error('Password must contain at least one special character')
      }
      if (value.search(/[a-zA-Z0-9а-яА-Я]/) == -1) {
        throw new Error('Password must contain at least one cyrillic or latin letter')
      }
      return true
    })
  ]);
router.route('/last-exchange-rates').post(exchangeController.getLastExchangeRates);
module.exports = router;