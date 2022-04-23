class Article {
    CATEGORY = {
        FOREX: 1,
        SECMARKS: 2,
        POLICY: 3,
    }

    constructor(id, title, content, source, created_at) {
        this.title = title;
        this.content = content;
        this.source = source;
        this.created_at = created_at;
    }

    constructor(json) {
        this.title = json.title;
        this.content = json.content;
        this.source = json.source;
        this.created_at = json.created_at;
    }
}

module.exports = Article;