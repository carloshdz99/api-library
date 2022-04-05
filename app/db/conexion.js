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

const obtenerConexion2 = async () => {
    //creando conexion a la base
    const PoolConect = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'library',
        password: '123456',
        port: 5432,
    })

    await PoolConect.connect();

    return PoolConect
}

module.exports = {
    obtenerConexion,
    obtenerConexion2
}
