const express = require('express')
const Route = express.Router()

//importando controlador de libros
const BookController = require("../app/controllers/BookController")
//importando controlador de usuarios
const UserController = require("../app/controllers/UserController")

Route.get("/", () => {
    console.log("encontro la ruta")
})

//ruta para registrar un nuevo libro
Route.post("/mnt-book/store", BookController.storeBooks)
Route.post("/mnt-book/storeRecord", BookController.storeBookRecord)
Route.get("/mnt-book/getBooks", BookController.getAllBooks)

//rutas de usuarios
Route.post("/mnt-user/store", UserController.storeUser)


module.exports = Route