const Article = require('./models/Article');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey } = require('firebase/database');

class ArticleController {
}


class Source { //хочу напакостить
    constructor(interval, name) {
        this.interval = interval;
        this.isEnabled = true;
    }
}

module.exports = new ExchangeRateController();