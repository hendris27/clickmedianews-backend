const db = require("../helpers/db.helper");

exports.findAllNotificationByUserId = async function (userId, params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.category = params.category || "";
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "notifications"
    WHERE "text" LIKE $1 AND
    "recipientId" = $2`;

    const countvalues = [`%${params.search}%`, userId];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "n"."id",
    "n"."text"
    FROM "notifications" "n"
    WHERE "n"."text" LIKE $1`;

    const values = [`%${params.search}%`];
    const { rows } = await db.query(query, values);
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: params.page,
            limit: params.limit,
            totalPage: Math.ceil(countRows[0].count / params.limit),
        },
    };
};

exports.insert = async (data) => {
    const query = `INSERT INTO "notifications" ("text", "action", "articleId", "recipientId", "senderId")
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

exports.destroy = async (id) => {
    const query = `
    DELETE FROM "notifications" WHERE id = $1 RETURNING *
    `;

    const values = [id];
    const { rows } = db.query(query, values);
    return rows[0];
};
