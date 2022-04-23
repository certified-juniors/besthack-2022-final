class User {
    static ROLE = {
        ADMIN: 'admin',
        READONLY: 'readonly',
        CLIENT: 'client',
    };
    constructor(login, email, hashed_password, created_at, role) {
        this.login = login;
        this.email = email;
        this.hashed_password = hashed_password;
        this.created_at = created_at;
        this.role = role;
        this.balance = {
            'RUB': 0,
            'USD': 0,
            'EUR': 0,
            'CNY': 0,
            'TRY': 0,
            'GBP': 0,
        }
        this.blocked = false;
        this.tries = 0;
    }
}

module.exports = User;