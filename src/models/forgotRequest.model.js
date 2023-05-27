const db = require("../helpers/db.helper");
const table = "forgotRequest";

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("email", "code")
    VALUES ($1, $2) RETURNING *
    `;
    const values = [data.email, data.code];
    const {rows} = await db.query(query, values);
    return rows[0];
}; 

exports.findOneByEmail = async (email)=>{
    const query =`
    SELECT * FROM "${table}" WHERE email = $1`;

    const values = [email];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.findOneByCodeAndEmail = async (code, email)=>{
    const query =`
    SELECT * FROM "${table}" WHERE code=$1 AND email=$2` ;

    const values = [code, email];
    const {rows} = await db.query(query, values);
    return rows[0];
};

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows[0];
};

