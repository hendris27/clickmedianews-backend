const db = require("../../helpers/db.helper");

const table = "articleId";

exports.findAll = async function(params, createdBy){
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page -1)* params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "${table}"
    WHERE "title" LIKE $1`;

    const countvalues = [`%${params.search}%`];
    const {rows: countRows} = await db.query(countQuery, countvalues);

    const query= `
    SELECT
    "a"."id",
    "a"."title",
    left("a"."descriptions",50) as descriptions,
    COUNT("al"."id")::INTEGER as "likeCount",
    "a"."createdAd",
    "a"."updatedAt"
    FROM "${table}" 
    LEFT JOIN "articleLike" AS "al" ON "ai"."articleId" = "a"."id"
    WHERE "a"."createdBy"=$1
    GRUB BY "a"."id"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $2 OFFSET $3`;

    const values = [createdBy, params.limit, offset];
    const {rows} = await db.query(query, values);
    return {rows, pageInfo:{
        totalData: countRows[0].count,
        page: params.page,
        limit: params.limit,
        totalPage: Math.ceil(countRows[0].count / params.limit)
    }};
};


exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("articleId", "userId")
    VALUES ($1, $2) RETURNING *
    `;
    const values = [data.articleId, data.userId];
    const {rows} = await db.query(query, values);
    return rows[0];
};


exports.destroy = async function(id, userId){
    const query = `
    DELETE FROM "${table}"
     WHERE "id"=$1
     AND "userId"=$2 
     RETURNING *`;

    const values = [id, userId];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.findOne = async function(id, createdBy){
    const query =`
    SELECT * FROM "${table}" 
    WHERE id=$1 AND "createdBy"=$2`;

    const values = [id, createdBy];
    const {rows} = await db.query(query, values);
    return rows[0];
};

