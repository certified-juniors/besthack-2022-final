const ExchangeRate = require('../models/ExchangeRate');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey } = require('firebase/database');

class ExchangeRateController {
    static DEFAULT_UPDATE_INTERVAL = 10 * 60 * 1000;
    constructor () {
        const lstupd = (await get(child(query(ref(db, 'exchange-rates/'), orderByKey()), '-1'))).val().timestamp
        this.lastUpdate = lstupd ? lstupd : this.updateExchangeRate();
        const intms = (await get(ref(db, 'config/exchange-rate-update-interval'))).val();
        if (!intms) {
            set(ref(db, 'config/exchange-rate-update-interval'), ExchangeRateController.DEFAULT_UPDATE_INTERVAL);
            this.updateInterval = ExchangeRateController.DEFAULT_UPDATE_INTERVAL;
        } else {
            this.updateInterval = intms;
        }
        this.interval = setInterval(this.updateExchangeRate.bind(this), this.intervalMs);
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
        const rates = await get(ref(db, 'exchange-rates'));
        const currencies = Object.keys(rates);
        const promises = currencies.map(currency => {
            if (currency == 'RUB')
                return Promise.resolve();
            return this.setExchangeRate(currency, Math.random());
        });
        await Promise.all(promises);
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