class ExchangeRate {
    constructor(id, currency, rate, timestamp) {
        this.currency = currency; // string
        this.rate = rate; // float to RUB
        this.timestamp = timestamp;
    }
    constructor(json) {
        this.currency = json.currency;
        this.rate = json.rate;
        this.created_at = json.created_at;
    }
}