const ExchangeRate = require('../models/ExchangeRate');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey } = require('firebase/database');
const [parser, parser_currency] = require('../utils/parser');
const User = require('../models/User');

class ExchangeRateController {
    static DEFAULT_UPDATE_INTERVAL = 10 * 60 * 1000;
    constructor () {
        get(child(query(ref(db, 'exchange-rates/'), orderByKey()), '-1')).then(snapshot => {
            if (snapshot.val()) {
                this.lastUpdate = snapshot.val().timestamp;
            } else {
                this.updateExchangeRate();
            }
        });
    }

    async getExchangeRate() {
        return (await get(child(query(ref(db, 'exchange-rates/'), orderByKey()), '-1'))).val();
        
    }

    async setExchangeRate(currency, rate) {
        await set(ref(db, 'exchange-rates/' + new Date().getTime()), {
            currency,
            rate,
            timestamp: new Date().getTime()
        });
    }

    async updateExchangeRate() {
        // TODO
        const currencies = Object.keys(new User(0, 0, 0, 0, 0).balance) ;
        const promises = currencies.map(async currency => {
            console.log(currency);
            const price = parser_currency(currency)
            return {[currency]: price};
        });
        const values = await Promise.all(promises);
        

        this.lastUpdate = new Date().getTime();
        return this.lastUpdate;
    }

    async getLastExchangeRates(req, res) {
        const rates = await get(ref(db, 'exchange-rates'));
        const currencies = Object.keys(rates);
        const promises = currencies.map(currency => {
            return this.getExchangeRate(currency);
        });
        const exchangeRates = await Promise.all(promises);
        res.json(exchangeRates);
    }
}

module.exports = new ExchangeRateController();