const db = require("../helpers/db.helper");

exports.findAllArticle = async function(params){
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
    "a"."categoryId",
    "a"."createdAt",
    "a"."updatedAt"
    FROM "articles" "a"
    LEFT JOIN "articleLikes" AS "al" ON "al"."articleId" = "a"."id"
    WHERE "a"."title" LIKE $1
    GROUP BY "a"."id"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $2 OFFSET $3`;

    const values = [`%${params.search}%`, params.limit, offset];
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
    WHERE "id"::TEXT LIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    console.log(query);
    const values = [params.limit, offset, `%${params.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findAllSavedArticle = async function (id) {
    const query = `
    SELECT 
    "id", 
    "picture", 
    "title", 
    "descriptions",
    "createdAt",
    "updatedAt"
    FROM "articles" 
    WHERE "createdBy"=$1
    `;
    const values = [id];
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

exports.findOneArticleView = async function (id) {
    const query = `
    SELECT
        "a"."id",
        "a"."picture" as "articlePicture",
        "a"."title",
        "a"."descriptions",
        "p"."picture" as "profilePicture",
        "p"."fullName",
        "a"."createdAt",
        "a"."updatedAt"
    FROM "articleProfile" "ap"
    JOIN "articles" "a" ON "a"."id" = "ap"."articleId"
    JOIN "profile" "p" ON "p"."id" = "ap"."profileId"
    WHERE "a"."id"=$1
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
    "status")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

    const values= [
        data.picture,
        data.title, 
        data.descriptions, 
        data.categoryId, 
        data.status,
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
