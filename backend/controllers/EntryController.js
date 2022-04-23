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

    async logBlock(user, req, byAdmin) {
        const entry = new Entry(new Date().getTime(), req.ip, user.login, Entry.CATEGORY.USER_BLOCKED, { byAdmin: true });
    }
}

module.exports = new EntryController();