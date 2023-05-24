const db = require("../helpers/db.helper");

exports.insert = async function (data) {
    const query = `
    INSERT INTO "comments" ("userId", "articleId", "textComment")
    VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [data.userId, data.articleId, data.textComment];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.findOneByUserIdAndArticleId = async function (userId, articleId) {
    const query = `
    SELECT * FROM "events" WHERE userId=$1 AND articleId=$2
    `;
    const values = [userId, articleId];
    const {rows} = await db.query(query, values);
    return rows[0];
};
