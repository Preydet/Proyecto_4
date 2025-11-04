const fs = require('fs').promises;
const path = require('path');

// Ruta al archivo JSON
const reservasPath = path.join(__dirname, '../reservas.json');

// Obtener todas las reservas
const getReservas = async(req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8');
        const reservas = JSON.parse(data) || [];
        res.status(200).json(reservas);
    } catch (err) {
        console.error('Error al leer las reservas:', err);
        res.status(500).json({ error: 'Error al leer las reservas' });
    }  
};

module.exports = {
    getReservas
};
