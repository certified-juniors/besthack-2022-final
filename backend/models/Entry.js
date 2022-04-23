class Entry {
    CATEGORY = {
        USER_CREATED: 1,
        USER_LOGGED_IN: 2,
        USER_CHANGED: 3,
        USER_BLOCKED: 4,
        USER_UNBLOCKED: 5,
        USER_CHANGED_BALANCE: 6,
        USER_BOUGHT_RATE: 7,
    }
    constructor(timestamp, ip, username, category, data) {
        this.timestamp = timestamp;
        this.ip = ip;
        this.username = username;
        this.category = category;
        this.data = data;
    }
    constructor(json) {
        this.timestamp = json.timestamp;
        this.ip = json.ip;
        this.username = json.username;
        this.category = json.category;
        this.data = json.data;
    }
}

module.exports = Entry;