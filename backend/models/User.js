class User {
    constructor(id, login, email, hashed_password, created_at, updated_at, is_admin) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.hashed_password = hashed_password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_admin = is_admin;
    }
}


module.exports = User;