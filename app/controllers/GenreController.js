//importando conexion a la base de datos
const res = require("express/lib/response")
const { obtenerConexion, obtenerConexion2 } = require("../db/conexion")

//funcion para tomar los generos de la base de datos
const getAllGenres = async (req, res) => {
    const db = obtenerConexion()

    try {
        const query = "SELECT * FROM mnt_genre";

        const genres = await (await db).query(query).then(result => { return result })

        return res.status(200).json({ genres: genres.rows })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ e })
    }
}

module.exports = {
    getAllGenres
}