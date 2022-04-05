const express = require("express");

const bodyparser = require("body-parser");

const { obtenerConexion } = require("./app/db/conexion")

const conecc = obtenerConexion()

const app = express();

require("dotenv").config({
    path: "./.env"
});

//importando las rutas
const Routes = require("./routers/ApiRoutes")

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//se utiliza para no tener problemas con CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//usando las rutas
app.use("/api/v1", Routes)

//tomando el puerto y el host
const puerto = process.env.PORT || 8080;
const host = process.env.HOTS

app.listen(puerto, host, () => {
    console.log(`${host}:${puerto}`)
})