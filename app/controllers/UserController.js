//importando conexion a la base de datos
const { obtenerConexion } = require("../db/conexion")

const storeUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const values = [firstName, lastName, email, password]

    const db = obtenerConexion()

    //query a ejecutar
    const query = "INSERT INTO mnt_user(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *"

    try {
        const userSave = await (await db).query(query, values)

        res.status(201).json({ userSave: userSave.rows[0] })
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = {
    storeUser
}