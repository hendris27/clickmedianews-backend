const db = require("../helpers/db.helper");

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1;
    params.limit = parseInt(params.limit) || 5;
    params.search = params.search || "";
    params.sort = params.sort || "id";
    params.sortBy = params.sortBy || "ASC";
    const offset = (params.page - 1) * params.limit;

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM "users"
    WHERE "email" LIKE $1`;

    const countValues = [`%${params.search}%`];
    const { rows: countRows } = await db.query(countQuery, countValues);

    const query = `
    SELECT * FROM "users" 
    WHERE "email" LIKE $3 
    ORDER BY ${params.sort} ${params.sortBy} 
    LIMIT $1 OFFSET $2`;

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

exports.findOne = async function (id) {
    const query = `
    SELECT 
    "users"."id",
    "users"."email",
    "profile"."fullName",
    "users"."password",
    "users"."phoneNumber",
    "role"."code" AS "role",
    "users"."createdAt",
    "users"."updatedAt"
    FROM "users" 
    JOIN "profile" ON "profile"."userId" = "users"."id"
    JOIN "role" ON "role"."id" = "users"."roleId"
    WHERE "users"."id"=$1
    `;

    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneByEmail = async function (email) {
    const query = `
    SELECT 
    "users"."id",
    "users"."email",
    "users"."password",
    "users"."phoneNumber",
    "role"."code" AS "role",
    "users"."createdAt",
    "users"."updatedAt"
    FROM "users" 
    JOIN "role" ON "role"."id" = "users"."roleId"
    WHERE "users"."id"=$1
    `;

    const values = [email];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.insert = async function (data) {
    const query = `
    INSERT INTO "users" ("email", "password", "phoneNumber", "roleId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [data.email, data.password, data.phoneNumber, data.roleId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.update = async function (id, data) {
    const query = `
    UPDATE "users" 
    SET 
    "email"= COALESCE(NULLIF($2, ''), "email"),
    "password"= COALESCE(NULLIF($3, ''), "password"),
    "phoneNumber"= COALESCE(NULLIF($4, ''), "phoneNumber"),
    "roleId"= COALESCE(NULLIF($5::INTEGER, NULL), "roleId")
    WHERE "id"=$1
    RETURNING *
    `;
    const values = [
        id,
        data.email,
        data.password,
        data.phoneNumber,
        data.roleId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "users" WHERE "id"=$1 RETURNING *
`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneByEmail = async (email) => {
    const query = `
    SELECT * FROM "users" WHERE email = $1`;

    const values = [email];
    const { rows } = await db.query(query, values);
    return rows[0];
};
