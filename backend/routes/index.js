const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { check } = require("express-validator");

router.route('/').get(async (req, res) => {
  return res
    .status(200)
    .send('<h1>Hello!</h1>')
})

router.route('/login').post(userController.login);
router.route('/register').get(userController.register,
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
module.exports = router;