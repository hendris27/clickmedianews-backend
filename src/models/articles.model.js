const db = require("../helpers/db.helper");

exports.findAllArticle = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.category = params.category || "";
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) as "title",
    COUNT("al"."id")::INTEGER as "likeCount",
    left("a"."descriptions", 50) as "descriptions",
    "c"."name" as "category",
    "a"."status",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    JOIN "categories" AS "c" ON "c"."id" = "a"."categoryId"
    WHERE "a"."title" ILIKE $1
    AND "c"."name" ILIKE $2
    GROUP BY "a"."id", "c"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $3 OFFSET $4`;

    const values = [
        `%${params.search}%`,
        `%${params.category}%`,
        params.limit,
        offset,
    ];
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

exports.findOne = async (id) => {
    const query = `
    SELECT
    "articles"."id",
    "articles"."picture",
    "articles"."title",
    "articles"."descriptions",
    "articles"."status",
    COUNT("articleLikes"."id")::INTEGER AS "likeCount",
    "articles"."createdBy",
    "articles"."createdAt",
    "articles"."updatedAt"
    FROM "articles"
    LEFT JOIN "articleLikes" ON "articleLikes"."articleId" = "articles"."id"
    WHERE "articles"."id"=$1
    GROUP BY "articles"."id"
    `;

    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneByUserId = async (userId, articleId) => {
    const query = `
    SELECT
    "articles"."id",
    "articles"."picture",
    "articles"."title",
    "articles"."descriptions",
    "articles"."status",
    COUNT("articleLikes"."id")::INTEGER AS "likeCount",
    (
        CASE WHEN 1 = (SELECT COUNT(*)::INTEGER FROM "articleLikes" WHERE "userId"=$2 AND "articleId"=$1)
        THEN TRUE
        ELSE FALSE
        END
    ) AS "isLike",
    "articles"."createdBy",
    "articles"."createdAt",
    "articles"."updatedAt"
    FROM "articles"
    LEFT JOIN "articleLikes" ON "articleLikes"."articleId" = "articles"."id"
    WHERE "articles"."id"=$1
    GROUP BY "articles"."id"
    `;

    const values = [articleId, userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findAllSavedArticle = async function (userId) {
    const query = `
    SELECT 
    "a"."id", 
    "a"."picture", 
    left("a"."title", 30) as title, 
    left("a"."descriptions", 100) as "descriptions",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    JOIN "savedPost" "sp" ON "sp"."articleId" = "a"."id"
    WHERE "sp"."userId"=$1
    `;
    const values = [userId];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findOneSavedArticle = async function (id, createdBy) {
    const query = `
    SELECT
        "id",
        "picture",
        "title",
        "descriptions",
        "createdAt",
        "updatedAt"
    FROM "articles"
    WHERE "id" = $1 AND 
    "createdBy" = $2
    `;
    const values = [id, createdBy];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneArticleView = async function (id) {
    const query = `
    SELECT
    "a"."id",
    "a"."picture" as "articlePicture",
    "a"."title",
    COUNT("al"."id") as "likeCount",
    "a"."descriptions",
    "p"."isAuthor",
    "p"."picture" as "profilePicture",
    "p"."fullName",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    JOIN "profile" "p" ON "p"."userId" = "a"."createdBy"
    WHERE "a"."id"=$1
    GROUP BY "a"."id","p"."fullName","p"."picture","p"."isAuthor"
    `;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.insert = async function (data) {
    const query = `
    INSERT INTO "articles" (
    "picture", 
    "title", 
    "descriptions",
    "categoryId",
    "status",
    "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

    const values = [
        data.picture,
        data.title,
        data.descriptions,
        data.categoryId,
        data.status,
        data.createdBy,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.update = async function (id, data) {
    const query = `
    UPDATE "articles" 
    SET 
    "picture"= COALESCE(NULLIF($2,''), "picture"),
    "title"= COALESCE(NULLIF($3, ''), "title"),
    "descriptions"= COALESCE(NULLIF($4,''), "descriptions"),
    "categoryId"= COALESCE(NULLIF($5::INTEGER, NULL), "categoryId"),
    "status"= COALESCE(NULLIF($6::BOOLEAN, NULL), "status")
    WHERE "id"=$1
    RETURNING *
    `;
    const values = [
        id,
        data.picture,
        data.title,
        data.descriptions,
        data.categoryId,
        data.status,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "articles" WHERE "id"=$1 RETURNING *
`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findAllArticleManage = async function (params, createdBy) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1
    AND "createdBy"=$2`;

    const countvalues = [`%${params.search}%`, createdBy];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "a"."id",
    "a"."picture",
    "a"."status",
    left("a"."title", 100) as "title",
    COUNT("al"."id") as "likeCount",
    left("a"."descriptions", 50) as "descriptions",
    "c"."name" as "category",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    JOIN "categories" AS "c" ON "c"."id" = "a"."categoryId"
    WHERE "a"."title" LIKE $2
    AND "a"."createdBy"=$1
    GROUP BY "a"."id", "c"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $3 OFFSET $4`;

    const values = [createdBy, `%${params.search}%`, params.limit, offset];
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

exports.findOneArticleManage = async function (params, createdBy, id) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) as "title",
    COUNT("al"."id") as "likeCount",
    left("a"."descriptions", 50) as "descriptions",
    "c"."name" as "category",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    JOIN "categories" AS "c" ON "c"."id" = "a"."categoryId"
    WHERE "a"."title" LIKE $3
    AND "a"."createdBy"=$2
    AND "a"."id"=$1
    GROUP BY "a"."id", "c"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $4 OFFSET $5`;

    const values = [id, createdBy, `%${params.search}%`, params.limit, offset];
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

//UNTUK HOME CATEGORY
exports.findArticleInCategories12 = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 7;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";

    const offset = (params.page - 1) * params.limit;

    const query = `
    SELECT
        "c"."id",
        "a"."id" as "articleId",
        "a"."picture",
        "c"."name" as "category",
        "c"."createdAt",
        "c"."updatedAt"
    FROM "categories" "c"
    JOIN "articleCategories" "ac" ON "ac"."categoryId" = "c"."id"
    JOIN "articles" "a" ON "a"."id" = "ac"."articleId"
    WHERE "ac"."id"::TEXT LIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [params.limit, offset, `%${params.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
};
