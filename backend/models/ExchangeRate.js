module.exports = class ExchangeRate {
    constructor( currency, rate, timestamp) {
        this.currency = currency; // string
        this.rate = rate; // float to RUB
        this.timestamp = timestamp;
    }
}