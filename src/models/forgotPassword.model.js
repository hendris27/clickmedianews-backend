const db = require("../helpers/db.helper")
const table = "forgotRequest"

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("email", "code")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.email, data.code]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findOneByEmail = async (email)=>{
    const query =`
    SELECT * FROM "${table}" WHERE email = $1`

    const values = [email]
    const {rows} = await db.query(query, values)
    return rows[0]
}

