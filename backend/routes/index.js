const express = require('express'),
  router = express.Router()

// тест запрос
router.route('/').get(async (req, res) => {

  return res
    .status(200)
    .send('<h1>Hello!</h1>')
})

module.exports = router