const db = require("../helpers/db.helper");

exports.insert = async function (data) {
    const query = `
    INSERT INTO "articleCategories" ("articleId", "categoryId")
    VALUES ($1, $2) RETURNING *
    `;
    const values = [data.articleId, data.categoryId];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "articleCategories" WHERE "id"=$1 RETURNING *
    `;
    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.findAllArticleCategory = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 10;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";

    const offset = (params.page - 1) * params.limit;

    const query = `
    SELECT
    "c"."id",
    "c"."name",
    "a"."picture"
    FROM "categories" "c"
    JOIN "articles" "a" ON "a"."categoryId" = "c"."id"
    WHERE "c"."name" :: TEXT LIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [params.limit, offset, `%${params.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
};
