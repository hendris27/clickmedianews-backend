const db = require("../helpers/db.helper");

const table = "savedPost";

exports.findAll = async function (params, userId) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "${table}"
    WHERE "id"::TEXT LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) AS "title",
    COUNT("al"."id") AS "likeCount",
    left("a"."descriptions", 50) AS "descriptions",
    "c"."name" AS "category",
    "a"."status",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "${table}"
    LEFT JOIN "articles" "a" ON "a"."id" = "${table}"."articleId"
    JOIN "categories" "c" ON "c"."id" = "a"."categoryId"
    JOIN "articleLikes" "al" ON "al"."articleId" = "a"."id"
    WHERE "${table}"."userId" = $1
    GROUP BY "a"."id", "c"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $2 OFFSET $3`;

    const values = [userId, params.limit, offset];
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

exports.findAllSavedArticle = async function (userId) {
    const query = `
    SELECT "articleId" FROM "${table}" WHERE "userId"::TEXT=$1
    `;
    const values = [userId];

    const { rows } = await db.query(query, values);
    return rows;
};

exports.insert = async function (data) {
    const query = `
    INSERT INTO "${table}" ("articleId", "userId")
    VALUES ($1, $2) RETURNING *
    `;
    const values = [data.articleId, data.userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (articleId, userId) {
    const query = `
    DELETE FROM "${table}"
    WHERE "articleId"=$1
    AND "userId"=$2 
    RETURNING *`;

    const values = [articleId, userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOne = async function (articleId, userId) {
    const query = `
    SELECT * FROM "${table}" 
    WHERE articleId=$1 AND "userId"=$2`;

    const values = [articleId, userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};
