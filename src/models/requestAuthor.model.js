const db = require("../helpers/db.helper");

exports.insert = async (data) => {
    const query = `
    INSERT INTO "requestAuthor" ("userId") VALUES ($1) RETURNING *`;

    const values = [data];
    const { rows } = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function(id){
    const query = `
    DELETE FROM "requestAuthor" WHERE "id"=$1 RETURNING *
    `;
    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.findAll = async (qr) => {
    qr.page = parseInt(qr.page) || 1;
    qr.limit = parseInt(qr.limit) || 5;
    qr.search = qr.search || "";
    qr.sort = qr.sort || "id";
    qr.sortBy = qr.sortBy || "ASC";
    const offset = (qr.page - 1) * qr.limit;

    const query = `
    SELECT
      "ra"."id",
      "p"."fullName"

    FROM "requestAuthor" "ra"
    JOIN "profile" "p" ON "p"."userId" = "ra"."userId"
    WHERE "p"."fullName" ILIKE $1
    ORDER BY ${qr.sort} ${qr.sortBy}
    LIMIT $2 OFFSET $3
  `;

    const values = [`%${qr.search}%`, qr.limit, offset];
    const { rows } = await db.query(query, values);
    return rows;
};

exports.findOne = async (id) => {
    const query = `
    SELECT
      "ra"."id",
      "p"."fullName"
    FROM "requestAuthor" "ra"
    JOIN "profile" "p" ON "p"."userId" = "ra"."userId"
    WHERE "ra"."id"=$1
  `;

    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};
