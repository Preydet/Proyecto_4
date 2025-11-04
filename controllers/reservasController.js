const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const reservasPath = path.join(__dirname, '../reservas.json');

// Obtener todas las reservas
const getReservas = (req, res) => {
    fs.readFile(reservasPath, 'utf8', (err, data) => {
        if (err) 
            return res.status(500).json({ error: 'Error al leer las reservas' });
        const reservas = JSON.parse(data) || '[]';
        res.json(reservas);
    });
};

module.exports = {
    getReservas
};