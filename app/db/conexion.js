const { Pool, Client } = require('pg')


const obtenerConexion = async () => {
    //creando conexion a la base

    //en local
    const ClientConect = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'library',
        password: '123456',
        port: 5432,
    })

    //en remoto
    // const ClientConect = new Client({
    //     user: 'yyfftgmmrurqni',
    //     host: 'ec2-3-230-122-20.compute-1.amazonaws.com',
    //     database: 'd9mmkq080bbodk',
    //     password: 'f9e907c556904e5394504696faff7b93f58cd7535a2d39f34aeb4057c2848413',
    //     port: 5432,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // })

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

    //en remoto
    // const PoolConect = new Pool({
    //     user: 'yyfftgmmrurqni',
    //     host: 'ec2-3-230-122-20.compute-1.amazonaws.com',
    //     database: 'd9mmkq080bbodk',
    //     password: 'f9e907c556904e5394504696faff7b93f58cd7535a2d39f34aeb4057c2848413',
    //     port: 5432,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // })

    await PoolConect.connect();

    return PoolConect
}

module.exports = {
    obtenerConexion,
    obtenerConexion2
}
