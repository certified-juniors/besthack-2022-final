const Entry = require('../models/Entry');
const { db } = require('../fbapi');
const { push, set, ref, get, child, equalTo, query, orderByValue, onValue } = require('firebase/database');

class EntryController {
    async logLogin(user, req) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_LOGGED_IN);
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logRegister(user, req) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_CREATED);
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logBlock(user, req, byAdmin = null) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_BLOCKED, { byAdmin });
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logUnblock(user, req, unblockedLogin, byAdmin = null) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_UNBLOCKED, {unblockedLogin});
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logBalanceChange(user, req, currency, delta, byAdmin = null) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_CHANGED_BALANCE, {currency, delta, byAdmin});
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logBuyRate(user, req, rate, amount) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_BOUGHT_RATE, {rate, amount});
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }

    async logSellRate(user, req, rate, amount) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_SELLED_RATE, {rate, amount});
        await set(ref(db, 'entries/' + entry.timestamp), entry);
    }
}

module.exports = new EntryController();