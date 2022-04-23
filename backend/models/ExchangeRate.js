module.exports = class ExchangeRate {
    constructor( currenciesRatesObj, timestamp) {
        Object.keys(currenciesRatesObj).forEach(currency => {
            this.rates[currency] = currenciesRatesObj[currency];
        });
        this.timestamp = timestamp;
    }
}