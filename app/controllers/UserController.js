//importando conexion a la base de datos
const { obtenerConexion } = require("../db/conexion")

const storeUser = async (req, res) => {
    const { firstName, lastName, email } = req.body
    const values = [firstName, lastName, email]

    const db = obtenerConexion()

    //query a ejecutar
    const query = "INSERT INTO mnt_user(firstName, lastName, email) VALUES($1, $2, $3)"

    try {
        const bookSave = (await db).query(query, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })

        res.status(201).json(bookSave)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = {
    storeUser
}