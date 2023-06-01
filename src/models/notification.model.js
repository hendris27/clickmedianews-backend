const db = require("../helpers/db.helper");

exports.insert = async (data) => {
    const query = `INSERT INTO "notification" ("text", "action", "articleId", "recipientId", "senderId")
    VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [
        data.text,
        data.action,
        data.articleId,
        data.recipientId,
        data.senderId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};
