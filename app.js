const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3000;

// Permitir CORS para conectar frontend y backend
app.use(cors());

// Configura la conexión a tu base de datos Oracle
const dbConfig = {
    user: 'usuario', // Tu usuario de Oracle
    password: 'password', // Tu contraseña de Oracle
    connectString: 'your-db-connection-string' // Cadena de conexión de Oracle
};

// Ruta para obtener los embalses cercanos en un radio de 100 km
app.get('/embalses-cercanos', async (req, res) => {
    try {
        // Obtener coordenadas del usuario desde el frontend
        const { lat, lon } = req.query;

        // Abrir una conexión a la base de datos
        let connection = await oracledb.getConnection(dbConfig);

        // Consulta SQL que usa Haversine Formula para obtener embalses dentro de 100 km
        const result = await connection.execute(
            `SELECT id, nombre, latitud, longitud, 
                ( 6371 * acos( cos( radians(:lat) ) * cos( radians( latitud ) ) * cos( radians( longitud ) - radians(:lon) ) + sin( radians(:lat) ) * sin( radians( latitud ) ) ) ) AS distance 
             FROM embalses 
             HAVING distance < 100 
             ORDER BY distance`,
            [lat, lon], // Pasar las coordenadas del usuario como parámetros
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Cerrar la conexión a la base de datos
        await connection.close();

        // Enviar los embalses como respuesta
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los embalses.');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
