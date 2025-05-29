const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: '15.228.162.13',
    user: 'root',
    password: '',
    database: 'tu_base_de_datos'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas

// Agregar un registro
app.post('/add', (req, res) => {
    const { name, rut, dob, birthplace, address, phone, email, parents, friends } = req.body;

    const query = `INSERT INTO personas (name, rut, dob, birthplace, address, phone, email) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, rut, dob, birthplace, address, phone, email], (err, result) => {
        if (err) return res.status(500).send(err);

        const personId = result.insertId;

        // Insertar padres
        if (parents.length > 0) {
            const parentQueries = parents.map(parent =>
                db.query(`INSERT INTO padres (person_id, name, rut) VALUES (?, ?, ?)`,
                    [personId, parent.name, parent.rut])
            );
        }

        // Insertar amigos
        if (friends.length > 0) {
            const friendQueries = friends.map(friend =>
                db.query(`INSERT INTO amigos (person_id, rut, description) VALUES (?, ?, ?)`,
                    [personId, friend.rut, friend.description])
            );
        }

        res.send({ message: 'Registro agregado correctamente' });
    });
});

// Obtener todos los registros
app.get('/list', (req, res) => {
    db.query('SELECT * FROM personas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Obtener detalles por ID
app.get('/detail/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        `SELECT * FROM personas WHERE id = ?;
         SELECT * FROM padres WHERE person_id = ?;
         SELECT * FROM amigos WHERE person_id = ?;`,
        [id, id, id],
        (err, results) => {
            if (err) return res.status(500).send(err);

            res.json({
                person: results[0][0],
                parents: results[1],
                friends: results[2]
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
