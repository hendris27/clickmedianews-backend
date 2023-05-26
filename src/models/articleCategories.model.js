const db = require("../helpers/db.helper");

exports.insert = async function (data) {
    const query = `
    INSERT INTO "articleCategories" ("articleId", "categoryId")
    VALUES ($1, $2) RETURNING *
    `;
    const values = [data.articleId, data.categoryId];
    const {rows} = await db.query(query, values);
    return rows[0];
};
