//importando conexion a la base de datos
const { obtenerConexion } = require("../db/conexion")

//funcion para insertar libros en la base de datos
const storeBooks = async (req, res) => {
    //tomando el cuerpo de la peticion
    const { title, author, published, year, stock, id_user } = req.body

    const values = [title, author, published, year, stock, id_user]
    const db = obtenerConexion()

    //query a ejecutar
    const query = "INSERT INTO mnt_book(title, author, published, year, stock, id_user) VALUES($1, $2, $3, $4, $5, $6)"

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

//funcion para insertar un prestamo de libro
const storeBookRecord = async (req, res) => {
    const { id_user, id_book } = req.body

    const values = [id_user, id_book]

    const db2 = obtenerConexion()
    //query a ejecutar
    const query = "INSERT INTO mnt_record(id_user, id_book, returned) VALUES($1, $2, false)"

    try {
        const bookSave = (await db2).query(query, values, async (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })

        // const bookStock = "SELECT stock FROM mnt_book WHERE id = " + id_book + ""
        const query2 = {
            text: 'SELECT * FROM mnt_book WHERE id = $1',
            values: [3],
        }

        const bookStock= (await db2).query(query2, async (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                const bookUpdate = "UPDATE mnt_book SET stock = " + (res.rows[0].stock - 1) + " WHERE id = " + id_book + ""
                ;(await db2).query(bookUpdate,(err, res) => {
                    if (err) {
                        console.log(err.stack)
                    } else {
                        console.log(res.rows[0])
                    }
                })
            }
        })

        res.status(201).json({message: "registro creado"})
    } catch (e) {
        res.status(500).json({ e })
    }
}

module.exports = {
    storeBooks,
    storeBookRecord
}