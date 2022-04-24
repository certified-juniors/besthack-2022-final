const Article = require('../models/Article');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey, limitToLast, limitToFirst } = require('firebase/database');
const parser_ria = require("../utils/parser_ria");
const parser_rbk = require("../utils/parser_rbk");
const parser_vesti = require("../utils/parser_vesti");
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
    async updateArticles(source) {
        switch (source) {
            case 'ria':
                const ria_news = await parser_ria('https://ria.ru/export/rss2/archive/index.xml')
                for (const news of ria_news) {
                    let article = new Article(
                      news.title,
                      news.description,
                      news.link,
                      news.date
                    )
                    await set(ref(db, 'articles/' + news.title), article)
                }
                break;

            case 'vesti':
                const vesti_news = await parser_vesti('https://www.vesti.ru/vesti.rss')
                for (const news of vesti_news) {
                    let article = new Article(
                      news.title,
                      news.description,
                      news.link,
                      news.date
                    )
                    await set(ref(db, 'articles/' + news.title), article)
                }
                break;

            case 'rbk':
                const rbk_news = await parser_rbk('http://static.feed.rbc.ru/rbc/logical/footer/news.rss')
                for (const news of rbk_news) {
                    let article = new Article(
                      news.title,
                      news.description,
                      news.link,
                      news.date
                    )
                    await set(ref(db, 'articles/' + news.title), article)
                }
                break;
            default:
                break;
        }
    }
    async getLastArticles(req, res) {
        console.log(req.query)
        try {
            const {amount} = req.query;
            const articles = (await get(query(ref(db, 'articles/'), limitToFirst(amount)))).val();

            res.send(articles);
        } catch (e) {
            console.error(e)
        }
    }
    
}

module.exports = new ArticleController();