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

// Crear una nueva reserva
const createReserva = async(req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8');
        const reservas = JSON.parse(data) || [];

        const nuevaReserva = {
            id: reservas.length ? reservas[reservas.length - 1].id + 1 : 1,
            hotel: req.body.hotel,
            tipo_habitacion: req.body.tipo_habitacion,
            num_huespedes: req.body.num_huespedes,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            estado: req.body.estado || 'pendiente'
        };

//Validar campos obligatorios
if (!nuevaReserva.hotel || !nuevaReserva.tipo_habitacion || !nuevaReserva.num_huespedes || !nuevaReserva.fecha_inicio || !nuevaReserva.fecha_fin) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
}
        reservas.push(nuevaReserva);
        await fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2));

        res.status(201).json(nuevaReserva);
    } catch (err) {
        console.error('Error al crear la reserva:', err);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}

    module.exports = {
        getReservas,
        createReserva
    };

