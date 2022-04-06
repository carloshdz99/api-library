//importando conexion a la base de datos
const res = require("express/lib/response")
const { obtenerConexion, obtenerConexion2 } = require("../db/conexion")

//funcion para insertar libros en la base de datos
const storeBooks = async (req, res) => {
    //tomando el cuerpo de la peticion
    const { title, author, published, year, stock, id_user, id_genre } = req.body

    const values = [title, author, published, year, stock, 1]
    const db = obtenerConexion2()

    //query a ejecutar
    const query = "INSERT INTO mnt_book(title, author, published, year, stock, id_user) VALUES($1, $2, $3, $4, $5, $6) RETURNING id"

    try {
        const bookSave = await (await db).query(query, values).then(result => { return result })

        //insertamos en la tabla genero
        const query2 = "INSERT INTO mnt_genre_book(id_genre, id_book) VALUES ($1, $2) RETURNING *"
        const values2 = [id_genre, bookSave.rows[0].id]
            ; (await db).query(query2, values2, (err, result) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    res.status(201).json({ registro: result.rows[0] })
                }
            })
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
}

//funcion para insertar un prestamo de libro
const storeBookRecord = async (req, res) => {
    const { id_user, id_book } = req.body

    const dateNow = new Date();
    const values = [id_user, id_book, dateNow.toLocaleDateString(), null, false]

    const db2 = obtenerConexion()
    //query a ejecutar
    const query = "INSERT INTO mnt_record(id_user, id_book, date_loan, returned) VALUES($1, $2, $3, false)"

    try {
        const bookSave = (await db2).query(query, values, async (err, res) => {
            if (err) {
                return res.status(500).json(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })

        // const bookStock = "SELECT stock FROM mnt_book WHERE id = " + id_book + ""
        const query2 = {
            text: 'SELECT * FROM mnt_book WHERE id = $1',
            values: [id_book],
        }

        const bookStock = (await db2).query(query2, async (err, res) => {
            if (err) {
                return res.status(500).json(err.stack)
            } else {
                const bookUpdate = "UPDATE mnt_book SET stock = " + (res.rows[0].stock - 1) + " WHERE id = " + id_book + ""
                    ; (await db2).query(bookUpdate, (err, res) => {
                        if (err) {
                            return res.status(500).json(err.stack)
                        } else {
                            console.log(res.rows[0])
                        }
                    })
            }
        })

        res.status(201).json({ message: "registro creado" })
    } catch (e) {
        res.status(500).json({ e })
    }
}

//funcion que registrara la devolucion de libros
const returnedBook = async (req, res) => {
    const { id_user, id_book } = req.body

    const dateNow = new Date();
    const values = [id_user, id_book, null, dateNow.toLocaleDateString(), true]

    const db2 = obtenerConexion()
    //query a ejecutar
    const query = "INSERT INTO mnt_record(id_user, id_book, date_loan, date_returned, returned) VALUES($1, $2, $3, $4, $5)"

    try {
        const bookSave = (await db2).query(query, values, async (err, res) => {
            if (err) {
                return res.status(500).json(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })

        // const bookStock = "SELECT stock FROM mnt_book WHERE id = " + id_book + ""
        const query2 = {
            text: 'SELECT * FROM mnt_book WHERE id = $1',
            values: [id_book],
        }

        const bookStock = (await db2).query(query2, async (err, res) => {
            if (err) {
                return res.status(500).json(err.stack)
            } else {
                const bookUpdate = "UPDATE mnt_book SET stock = " + (res.rows[0].stock + 1) + " WHERE id = " + id_book + ""
                    ; (await db2).query(bookUpdate, (err, res) => {
                        if (err) {
                            return res.status(500).json(err.stack)
                        } else {
                            console.log(res.rows[0])
                        }
                    })
            }
        })

        res.status(201).json({ message: "registro creado" })
    } catch (e) {
        res.status(500).json({ e })
    }
}

//funcion para tomar todos los libros de la base de datos
const getAllBooks = async (req, response) => {

    const db = obtenerConexion()
    try {
        const query2 = 'SELECT * FROM mnt_book';

        const books = await (await db).query(query2).then(result => { return result })

        response.status(200).json({ books: books.rows })
    } catch (e) {
        return res.status(500).json(e)
    }
}

//funcion para actualizar un libro
const updateBooks = async (req, response) => {
    
}

module.exports = {
    storeBooks,
    storeBookRecord,
    returnedBook,
    getAllBooks
}