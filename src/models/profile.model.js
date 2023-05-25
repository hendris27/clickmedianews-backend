const db = require("../../helpers/db.helper");
const table = "profile";

exports.insert = async (data) =>{
    const query = `
    INSERT INTO "${table}" (
    "username",
    "fullName", 
    "profession", 
    "about", 
    "picture")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

    const values = [
        data.username, 
        data.fullName, 
        data.profession, 
        data.about, 
        data.picture];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.update = async (userId, data)=>{
    const query = `
    UPDATE "${table}" 
    SET 
    "username"= COALESCE(NULLIF($2))
    "fullName"= COALESCE(NULLIF($3,''), "fullName"),
    "profession"= COALESCE(NULLIF($4,''), "profession"),
    "picture"= COALESCE(NULLIF($5,''), "picture"),
    WHERE "userId"=$1
    RETURNING *;
    `;
    const values = [
        userId, data.username,
        data.fullName,
        data.profession,
        data.picture
    ];
    const {rows} = await db.query(query,values);
    return rows[0] ;
};

exports.findOne = async function(userId){
    const query =`
    SELECT  
    "u"."id",
    "p"."picture",
    "p"."fullName",
    "p"."username",
    "u"."email",
    "u"."phoneNumbe",
    "p"."profession",
    "p"."createdAt",
    "p"."updatedAt"
    FROM "${table}" "p"
    JOIN "users" "u" ON "u"."id" = "p"."userId"
    WHERE "p"."userId"=$1`;

    const values = [userId];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1 RETURNING *;
`;
    const values = [id];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.findAll = async (page, limit, search, sort, sortBy)=>{
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 7;
    search = search || "";
    sort = sort || "id";
    sort = sort || "ASC";
    const offside = (page-1)*limit;
    const query = `
    SELECT * FROM "${table} WHERE "username" ILIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSIDE $2`;

    const values = [limit, offside, `%${search}%`];
    const {rows} = await db.query(query, values);
    return rows;
};
