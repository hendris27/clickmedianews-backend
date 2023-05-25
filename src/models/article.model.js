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
    "descriptions"
    "likes",
    "category",
    "status",
    "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`

    const values= [
        data.picture,
        data.title, 
        data.descriptions, 
        data.likes, 
        data.category, 
        data.status,
        data.createdBy
    ]
    const {rows} = await db.query(query, values)
    return rows[0]
}
