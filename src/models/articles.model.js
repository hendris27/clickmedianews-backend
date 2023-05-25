const db = require("../helpers/db.helper");

exports.findAllArticle = async function (params) {
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
    "likes",
    "categoryId",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "articles"
    WHERE "id" LIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [params.limit, offset, `%${params.search}%`];
    const { rows } = await db.query(query, values);
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

exports.insert = async function (data){
    const query=`
    INSERT INTO "articles" (
    "picture", 
    "title", 
    "descriptions",
    "categoryId",
    "status")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

    const values= [
        data.picture,
        data.title, 
        data.descriptions, 
        data.category, 
        data.status,
    ];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.update = async function(id, data){
    const query = `
    UPDATE "articles" 
    SET 
    "picture"= COALESCE(NULLIF($1,''), "picture"),
    "title"= COALESCE(NULLIF($2, ''), "title"),
    "descriptions"= COALESCE(NULLIF($3,''), "descriptions"),
    "categoryId"= COALESCE(NULLIF($4::INTEGER, NULL), "categoryId"),
    "status"= COALESCE(NULLIF($5::BOOLEAN, NULL), "status")
    WHERE "userId"=$1
    RETURNING *
    `
    const values = [id, data.picture, data.title, data.descriptions, data.categoryId, data.status]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "articles" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findOne = async function(id){
    const query =`
    SELECT * FROM "articles" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
