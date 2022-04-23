class Article {
    CATEGORY = {
        FOREX: 1,
        SECMARKS: 2,
        POLICY: 3,
    }

    constructor(title, content, source, created_at) {
        this.title = title;
        this.content = content;
        this.source = source;
        this.created_at = created_at;
    }
}

module.exports = Article;