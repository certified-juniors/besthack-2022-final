const ExchangeRate = require('../models/ExchangeRate');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue, orderByKey } = require('firebase/database');
const [parser, parser_currency] = require('../utils/parser');
const User = require('../models/User');

class ExchangeRateController {
    
    static DEFAULT_UPDATE_INTERVAL = 10 * 60 * 1000;
    constructor() {
        this.lastUpdate = new Date().getTime();
        this.lastValues = {};
        get(child(query(ref(db, 'exchange-rates/'), orderByKey()), '-1')).then(snapshot => {
            if (snapshot.val()) {
                console.log(snapshot.val());
                this.lastUpdate = snapshot.val().timestamp;
                this.lastValues = snapshot.val().values;
            } else {
                this.updateExchangeRate();
            }
        });
        get(ref(db, 'config/exchange-rate-update-interval')).then(snapshot => {
            this.updateInterval = snapshot.val() || ExchangeRateController.DEFAULT_UPDATE_INTERVAL;
            this.interval = setInterval(this.updateExchangeRate.bind(this), this.updateInterval);
        });
        
    }

    async getExchangeRate() {
        return (await get(child(query(ref(db, 'exchange-rates/'), orderByKey()), '-1'))).val();
    }

    async updateExchangeRate() {
        // TODO
        const currencies = Object.keys(new User(0, 0, 0, 0, 0).balance);
        const promises = currencies.map(async currency => {
            const price = await parser_currency(currency)
            return { [currency]: price };
        });
        const notokvalues = await Promise.all(promises);
        const values = {};
        notokvalues.forEach(notokvalue => {
            const stringfloat = notokvalue[Object.keys(notokvalue)[0]][0];
            const float = parseFloat(stringfloat.replace(',', '.'));
            values[Object.keys(notokvalue)[0]] = float;
        });
        const OTNOSITELNO = 'EUR';
        const OTNOSITELNO_to_rub = values['RUB'];
        Object.keys(values).forEach(currency => {
            if (currency == OTNOSITELNO) {
                values[OTNOSITELNO] = 1.0 / OTNOSITELNO_to_rub;
                return
            }
            if (currency == 'RUB') {
                values[currency] = 1;
                return
            }

            values[currency] = values[currency] / OTNOSITELNO_to_rub;
        })

        this.lastValues = values;
        this.lastUpdate = new Date().getTime();
        await set(ref(db, 'exchange-rates/' + this.lastUpdate), {
            timestamp: this.lastUpdate,
            values: this.lastValues
        });
    }

    async getLastExchangeRates(req, res) {
        const values = [];
        const to = this.lastValues;
        Object.keys(to).forEach(currency => {
            values.push({ title: currency, text: this.lastValues[currency] });
        });
        res.setHeader("Access-Control-Allow-Origin", '*')
        res.send(values);
    }
}

module.exports = new ExchangeRateController();