const db = require("../helpers/db.helper");

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 10;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";

    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "categories"
    WHERE "name" ILIKE $1`;

    const countvalues = [`%${params.search}%`];
    const { rows: countRows } = await db.query(countQuery, countvalues);

    const query = `
    SELECT
        "id",
        "name",
        "createdAt",
        "updatedAt"
    FROM "categories"
    WHERE "name" ILIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [params.limit, offset, `%${params.search}%`];
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

// exports.findArticleInCategories = async function (params) {
//     params.page = parseInt(params.page) || 1;
//     params.limit = parseInt(params.limit) || 7;
//     params.search = params.search || "";
//     params.sort = params.sort || "id";
//     params.sortBy = params.sortBy || "ASC";

//     const offset = (params.page - 1) * params.limit;

//     const query = `
//     SELECT
//         "c"."id",
//         "a"."id" as "articleId",
//         "a"."picture",
//         "c"."name" as "category",
//         "c"."createdAt",
//         "c"."updatedAt"
//     FROM "categories" "c"
//     JOIN "articleCategories" "ac" ON "ac"."categoryId" = "c"."id"
//     JOIN "articles" "a" ON "a"."id" = "ac"."articleId"
//     WHERE "ac"."id"::TEXT LIKE $3
//     ORDER BY ${params.sort} ${params.sortBy}
//     LIMIT $1 OFFSET $2
//     `;
//     const values = [params.limit, offset, `%${params.search}%`];
//     const { rows } = await db.query(query, values);
//     return rows;
// };

exports.insert = async function (data) {
    const query = `
    INSERT INTO "categories" ("name")
    VALUES ($1)
    RETURNING *`;

    const values = [data.name];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "categories" WHERE id=$1`;

    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "categories" WHERE "id"=$1 RETURNING *
`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};
