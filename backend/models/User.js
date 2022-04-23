class User {
    ROLE = {
        ADMIN: 'admin',
        READONLY: 'readonly',
        CLIENT: 'client',
    };
    constructor(id, login, email, hashed_password, created_at, role) {
        this.login = login;
        this.email = email;
        this.hashed_password = hashed_password;
        this.created_at = created_at;
        this.role = role;
    }
    constructor(json) {
        this.login = json.login;
        this.email = json.email;
        this.hashed_password = json.hashed_password;
        this.created_at = json.created_at;
        this.role = json.role;
    }
}

module.exports = User;