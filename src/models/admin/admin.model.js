const db = require("../helpers/db.helper");

const table = "admin";

exports.findAll = async (qs) => {
    qs.page = parseInt(qs.page) || 1;
    qs.limit = parseInt(qs.limit) || 5;
    qs.search = qs.search || "";
    qs.sort = qs.sort || "id";
    qs.sortBy = qs.sortBy || "ASC";

    const offset = (qs.page - 1) * qs.limit;
    const query = `
    SELECT * FROM "${table}"
    WHERE "email" LIKE $3
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

exports.findOneByEmail = async (email) => {
    const query = `
    SELECT * FROM "${table}" WHERE email=$1
    `;
    const values = [email];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.insert = async (data) => {
    const query = `
    INSERT INTO "${table}" ("email", "password", "phoneNumber") 
    VALUES ($1, $2, $3) 
    RETURNING *;
    `;
    const values = [data.email, data.password, data.phoneNumber];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.update = async (id, data) => {
    const query = `
    UPDATE "${table}" 
    SET 
    "email"=COALESCE(NULLIF($2, ''), "email"),
    "password"=COALESCE(NULLIF($3, ''), "password")
    "phoneNumber"=COALESCE(NULLIF($4, ''), "phoneNumber"),
    WHERE "id"=$1
    RETURNING *;
    `;
    const values = [id, data.email, data.password, data.phoneNumber];
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
