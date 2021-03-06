const express = require('express')
const Route = express.Router()

//importando controlador de libros
const BookController = require("../app/controllers/BookController")
//importando controlador de usuarios
const UserController = require("../app/controllers/UserController")
//importando controlador de generos
const GenreController = require("../app/controllers/GenreController")

Route.get("/", (req, res) => {
    res.send("Api")
})

//ruta para registrar un nuevo libro
Route.post("/mnt-book/store", BookController.storeBooks)
Route.post("/mnt-book/storeRecord", BookController.storeBookRecord)
Route.get("/mnt-book/getBooks", BookController.getAllBooks)
Route.put("/mnt-book/updateBook", BookController.updateBooks)

//rutas de usuarios
Route.post("/mnt-user/store", UserController.storeUser)
Route.get("/mnt-user/get", UserController.getAllUser)

//rutas de generos
Route.get("/mnt-genre/getGenres", GenreController.getAllGenres)

module.exports = Route