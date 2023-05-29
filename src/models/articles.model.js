const db = require("../helpers/db.helper");

exports.findAllArticle = async function(params){
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.category = params.category || "";
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page -1)* params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const {rows: countRows} = await db.query(countQuery, countvalues);

    const query= `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) as "title",
    COUNT("al"."id") as "likeCount",
    left("a"."descriptions", 50) as "descriptions",
    "c"."name" as "category",
    "a"."status",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    JOIN "categories" AS "c" ON "c"."id" = "a"."categoryId"
    WHERE "a"."title" LIKE $1
    AND "c"."name" LIKE $2
    GROUP BY "a"."id", "c"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $3 OFFSET $4`;

    const values = [`%${params.search}%`, `%${params.category}%`, params.limit, offset];
    const {rows} = await db.query(query, values);
    return {rows, pageInfo:{
        totalData: countRows[0].count,
        page: params.page,
        limit: params.limit,
        totalPage: Math.ceil(countRows[0].count / params.limit)
    }};
};

exports.findAllArticle1 = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.createdBy = params.createdBy || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";

    const offset = (params.page - 1) * params.limit;

    const query = `
    SELECT
    "id",
    "picture",
    "title",
    "descriptions",
    "categoryId",
    "createdAt",
    "updatedAt"
    FROM "articles"
    WHERE "id"::TEXT LIKE $3 AND
    "createdBy"::TEXT LIKE $4
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [params.limit, offset, `%${params.search}%`, `%${params.createdBy}%`];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findAllSavedArticle = async function (userId) {
    const query = `
    SELECT 
    "a"."id", 
    "a"."picture", 
    "a"."title", 
    left("a"."descriptions", 100) as "descriptions",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    JOIN "savedPost" "sp" ON "sp"."articleId" = "a"."id"
    WHERE "sp"."userId"=$1
    `;
    const values = [userId];
    const {rows} = await db.query(query, values);
    return rows;
};

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "articles" WHERE id=$1
    `;
    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
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
    const {rows} = await db.query(query, values);
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
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.insert = async function (data){
    const query=`
    INSERT INTO "articles" (
    "picture", 
    "title", 
    "descriptions",
    "categoryId",
    "status",
    "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

    const values= [
        data.picture,
        data.title, 
        data.descriptions, 
        data.categoryId, 
        data.status,
        data.createdBy
    ];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.update = async function(id, data){
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
    const values = [id, data.picture, data.title, data.descriptions, data.categoryId, data.status];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "articles" WHERE "id"=$1 RETURNING *
`;
    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.findOne = async function(id){
    const query =`
    SELECT
    "id",
    "picture",
    "title",
    "descriptions",
    "categoryId",
    "createdAt",
    "updatedAt"
    FROM "articles" WHERE "id"=$1`;

    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.findAllArticleManage = async function(params, createdBy){
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page -1)* params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const {rows: countRows} = await db.query(countQuery, countvalues);

    const query= `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) as "title",
    COUNT("al"."id") as "likeCount",
    "a"."descriptions",
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

    const values = [createdBy,`%${params.search}%`, params.limit, offset];
    const {rows} = await db.query(query, values);
    return {rows, pageInfo:{
        totalData: countRows[0].count,
        page: params.page,
        limit: params.limit,
        totalPage: Math.ceil(countRows[0].count / params.limit)
    }};
};

exports.findOneArticleManage = async function(params, createdBy, id){
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page -1)* params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "articles"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const {rows: countRows} = await db.query(countQuery, countvalues);

    const query= `
    SELECT
    "a"."id",
    "a"."picture",
    left("a"."title", 100) as "title",
    COUNT("al"."id") as "likeCount",
    "a"."descriptions",
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

    const values = [id, createdBy,`%${params.search}%`, params.limit, offset];
    const {rows} = await db.query(query, values);
    return {rows, pageInfo:{
        totalData: countRows[0].count,
        page: params.page,
        limit: params.limit,
        totalPage: Math.ceil(countRows[0].count / params.limit)
    }};
};

