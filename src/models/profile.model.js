const db = require("../helpers/db.helper");

const table = "profile";

exports.findAll = async (qs) => {
    qs.page = parseInt(qs.page) || 1;
    qs.limit = parseInt(qs.limit) || 5;
    qs.search = qs.search || "";
    qs.sort = qs.sort || "id";
    qs.sortBy = qs.sortBy || "ASC";

    const offset = (qs.page - 1) * qs.limit;
    const query = `
    SELECT * FROM "${table}"
    WHERE "fullName" LIKE $3
    ORDER BY ${qs.sort} ${qs.sortBy}
    LIMIT $1 OFFSET $2
    `;
    const values = [qs.limit, offset, `%${qs.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findOne = async (id) => {
    const query = `
    SELECT * FROM "${table}" WHERE id=$1
    `;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.findOneByUserId = async (userId) => {
    const query = `
    SELECT 
    "users"."id",
    "${table}"."fullName",
    "${table}"."picture",
    "users"."email",
    "users"."password",
    "${table}"."about",
    "${table}"."profession",
    "${table}"."createdAt",
    "${table}"."updatedAt"
    FROM "${table}"
    JOIN "users" ON "users"."id" = "${table}"."userId"
    WHERE "${table}"."userId"=$1
    `;
    const values = [userId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.insert = async (data) => {
    const query = `
    INSERT INTO "${table}" ("picture", "username", "fullName", "profession", "about", "userId", "isAuthor") 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
    const values = [
        data.picture,
        data.username,
        data.fullName,
        data.profession,
        data.about,
        data.userId,
        data.isAuthor,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.update = async (id, data) => {
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"),
    "username"=COALESCE(NULLIF($3, ''), "username"),
    "fullName"=COALESCE(NULLIF($4, ''), "fullName"),
    "profession"=COALESCE(NULLIF($5, ''), "profession"),
    "about"=COALESCE(NULLIF($6, ''), "about"),
    WHERE "id"=$1
    RETURNING *;
    `;
    const values = [
        id,
        data.picture,
        data.username,
        data.fullName,
        data.profession,
        data.about,
        data.userId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.updateByUserId = async (userId, data) => {
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"),
    "username"=COALESCE(NULLIF($3, ''), "username"),
    "fullName"=COALESCE(NULLIF($4, ''), "fullName"),
    "profession"=COALESCE(NULLIF($5, ''), "profession"),
    "about"=COALESCE(NULLIF($6, ''), "about"),
    "isAuthor"=COALESCE(NULLIF($7::BOOLEAN, NULL), "isAuthor")
    WHERE "userId"=$1
    RETURNING *;
    `;
    const values = [
        userId,
        data.picture,
        data.username,
        data.fullName,
        data.profession,
        data.about,
        data.isAuthor,
    ];
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
