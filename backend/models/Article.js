class Article {
    constructor(id, title, content, source, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.source = source;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

class Category extends Enumerator {
    constructor(id, name, created_at, updated_at) {
        super(id, name, created_at, updated_at);
    }
}

module.exports = Article;