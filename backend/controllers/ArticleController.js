const Article = require('./models/Article');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey, limitToLast, limitToFirst } = require('firebase/database');
const {} = require('../utils/parser')
class ArticleController {
    constructor() {
        get(ref(db, 'config/sources')).then(snapshot => {
            if (snapshot.val()) {
                this.sources = snapshot.val();
            } else {
                this.sources = {
                    'ria': {
                        interval: 10 * 60 * 1000,
                        isEnabled: true,
                    },
                    'vesti': {
                        interval: 10 * 60 * 1000,
                        isEnabled: true,
                    },
                    'rbk': {
                        interval: 10 * 60 * 1000,
                        isEnabled: true,
                    },
                };
                set(ref(db, 'config/sources'), this.sources);
            }
        }).then(() => {
            this.intervals = {};
            Object.keys(this.sources).forEach(source => {
                if (this.sources[source].isEnabled) {
                    this.intervals[source] = setInterval(this.updateArticles.bind(this, source), this.sources[source].interval);
                }
            });
        });
    }
    updateArticles(source) {
        switch (source) {
            case 'ria':
                //
                break;
            case 'vesti':
                //
                break;

            case 'rbk':
                //
                break;
            default:
                break;
        }
    }
    async getLastArticles(req, res) {
        const {amount} = req.body;
        const articles = (await get(query(ref(db, 'articles/'), limitToFirst(amount)))).val();
        
        res.send(articles);
    }
    
}

module.exports = new ExchangeRateController();