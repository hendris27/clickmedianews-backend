const db = require("../helpers/db.helper");

const table = "articleComments";

exports.findAll = async (qs) => {
    qs.page = parseInt(qs.page) || 1;
    qs.limit = parseInt(qs.limit) || 5;
    qs.search = qs.search || "";
    qs.sort = qs.sort || "id";
    qs.sortBy = qs.sortBy || "ASC";

    const offset = (qs.page - 1) * qs.limit;
    const query = `
    SELECT * FROM "${table}"
    WHERE "id"::TEXT LIKE $3
    ORDER BY ${qs.sort} ${qs.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [qs.limit, offset, `%${qs.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findAllByArticleId = async (qs, articleId) => {
    qs.page = parseInt(qs.page) || 1;
    qs.limit = parseInt(qs.limit) || 100;
    qs.sort = qs.sort || "id";
    qs.sortBy = qs.sortBy || "ASC";

    const offset = (qs.page - 1) * qs.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "${table}"
    WHERE "articleId"=$1`;

    const countvalues = [articleId];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "ac"."id",
    "ac"."articleId",
    "ac"."commentText",
    "p"."picture",
    "p"."fullName",
    "ac"."createdAt",
    "ac"."updatedAt"
    FROM "${table}" "ac"
    JOIN "profile" AS "p" ON "p"."userId" = "ac"."userId"
    WHERE "articleId"=$3
    ORDER BY ${qs.sort} ${qs.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [qs.limit, offset, articleId,];
    const { rows } = await db.query(query, values);
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: qs.page,
            limit: qs.limit,
            totalPage: Math.ceil(countRows[0].count / qs.limit),
        },
    };
};

exports.findOne = async (id) => {
    const query = `
    SELECT * FROM "${table}" WHERE id=$1
    `;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneByUserIdAndArticleId = async function (userId, articleId) {
    const query = `
    SELECT "${table}" FROM "${table}" WHERE userId=$1 AND articleId=$2
    `;
    const values = [userId, articleId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.insert = async function (data) {
    const query = `
    INSERT INTO "${table}" ("articleId", "userId", "commentText")
    VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [data.articleId, data.userId, data.commentText];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.update = async (id, data) => {
    const query = `
    UPDATE "${table}" 
    SET 
    "articleId"=COALESCE(NULLIF($2::INTEGER, NULL), "articleId"),
    "userId"=COALESCE(NULLIF($3::INTEGER, NULL), "userId"),
    "commentText"=COALESCE(NULLIF($4, ''), "commentText")
    WHERE "id"=$1
    RETURNING *;
    `;
    const values = [id, data.articleId, data.userId, data.commentText];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async (id) => {
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1
    RETURNING *;
    `;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroyByUserIdArticleId = async (id, userId) => {
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1 AND "userId"=$2
    RETURNING *;
    `;
    const values = [id, userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findAllByUserId = async (qs, userId) => {
    qs.page = parseInt(qs.page) || 1;
    qs.limit = parseInt(qs.limit) || 100;
    qs.sort = qs.sort || "id";
    qs.sortBy = qs.sortBy || "ASC";

    const offset = (qs.page - 1) * qs.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "${table}"
    WHERE "userId"=$1`;

    const countvalues = [userId];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "ac"."id",
    "ac"."userId",
    "ac"."createdAt",
    "ac"."updatedAt"
    FROM "${table}" "ac"
    WHERE "userId"=$3
    ORDER BY ${qs.sort} ${qs.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [qs.limit, offset, userId,];
    const { rows } = await db.query(query, values);
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: qs.page,
            limit: qs.limit,
            totalPage: Math.ceil(countRows[0].count / qs.limit),
        },
    };
};
