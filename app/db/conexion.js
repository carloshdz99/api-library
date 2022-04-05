const { Pool, Client } = require('pg')


const obtenerConexion = async () => {

    //creando conexion a la base
    const ClientConect = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'library',
        password: '123456',
        port: 5432,
    })

    await ClientConect.connect()


    return ClientConect
}

module.exports = {
    obtenerConexion
}
