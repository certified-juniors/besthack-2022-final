class User {
    ROLE = {
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
        this.balance = 0;
    }
}

module.exports = User;