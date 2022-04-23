class Article {
    static CATEGORY = {
        FOREX: 1,
        SECMARKS: 2,
        POLICY: 3,
    }
    static FOREX_KEYWORDS = [];
    static SECMARKS_KEYWORDS = [];
    static POLICY_KEYWORDS = [];
    constructor(title, content, source, created_at) {
        this.title = title;
        this.content = content;
        this.source = source;
        this.created_at = created_at;
        this.category = defineCategory(content);
    }

    defineCategory(content) {
        content = toString(content);
        let forex_counter = 0;
        let secmarks_counter = 0;
        let policy_counter = 0;
        for (word in Article.FOREX_KEYWORDS) {
            if (content.includes(word)) {
                forex_counter++;
            }
        }
        for (word in Article.SECMARKS_KEYWORDS) {
            if (content.includes(word)) {
                secmarks_counter++;
            }
        }
        for (word in Article.POLICY_KEYWORDS) {
            if (content.includes(word)) {
                policy_counter++;
            }
        }
        if (forex_counter > secmarks_counter && forex_counter > policy_counter) {
            return Article.CATEGORY.FOREX;
        } else if (secmarks_counter > forex_counter && secmarks_counter > policy_counter) {
            return Article.CATEGORY.SECMARKS;
        }
        return Article.CATEGORY.POLICY;
    }
}

module.exports = Article;