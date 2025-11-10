const fs = require('fs').promises;
const path = require('path');
const booking = require('../models/model');
const { v4: uuidv4 } = require('uuid');
const { json } = require('stream/consumers');
const { get } = require('http');

// Ruta al archivo JSON
const reservasPath = path.join(__dirname, '../reservas.json');

// Obtener todas las reservas
const getReservas = async(req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8');
        let reservas = json.parse(data) || [];

// Posibles Filtros desde query string
        const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

        // Filtro por hotel
        if (hotel) {
            reservas = reservas.filter(r => r.hotel.toLowerCase().includes(hotel.toLowerCase()));
        }

        // Filtro por habitacion
        if (tipo_habitacion) {
            reservas = reservas.filter(r => r.tipo_habitacion.toLowerCase().includes(tipo_habitacion.toLowerCase()));
        }

        // Filtro por estado
        if (estado) {
            reservas = reservas.filter(r => r.estado.toLowerCase().includes(estado.toLowerCase()));
        }
        // Filtro por numero de huespedes
        if (num_huespedes) {
            reservas = reservas.filter(r => Number(r.num_huespedes) === Number(num_huespedes));
        }
        // Filtro por fecha
        if (fecha_inicio && fecha_fin) {
            reservas = reservas.filter(r => 
                r.fecha_inicio >= fecha_inicio && r.fecha_fin <= fecha_fin
            );
        }

        res.status(200).json(reservas);
    } catch (err) {
        console.error('Error al leer las reservas:', err);
        res.status(500).json({ error: 'Error al leer las reservas' });
    } 
};
    
// Función GET ID

const getReservaById = async (req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8');
        const reservas = JSON.parse(data) || [];
        const reservaId = req.params.id.trim();// evita espacios en blanco
        const reserva = reservas.find(r => r.id === reservaId);

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (err) {
        console.error('Error al leer la reserva:', err);
        res.status(500).json({ error: 'Error al leer la reserva' });
    }   

};

// Crear una nueva reserva
const createReserva = async(req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8');
        const reservas = JSON.parse(data) || [];

        const { hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado } = req.body;

//Validar campos obligatorios
if (!hotel || !tipo_habitacion || !num_huespedes || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
}
// Cear una nueva isntancia de Booking
        const nuevaReserva = new booking(
            uuidv4(), // Generar un ID único
            hotel,
            tipo_habitacion,
            num_huespedes,
            fecha_inicio,
            fecha_fin,
            estado || 'pendiente'
        ); 

        reservas.push(nuevaReserva);
        await fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2));

        res.status(201).json(nuevaReserva);
    } catch (err) {
        console.error('Error al crear la reserva:', err);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}

//Actualizar una reserva existente
const updateReserva = async (req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8' );
        const reservas = JSON.parse(data) || [];

        const reservaId = req.params.id
        const index = reservas.findIndex(r => r.id === reservaId);
        if (index === -1) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        // Actualizar los campos de la reserva
        reservas[index] = {
            ...reservas[index],
            ...req.body
        };
        await fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2));

        res.status(200).json(reservas[index]);
    } catch (err) {
        console.error('Error al actualizar la reserva:', err);
        res.status(500).json({ error: 'Error al actualizar la reserva' });     
    }
}

//Eliminar una reserva existente
const deleteReserva = async (req, res) => {
    try {
        const data = await fs.readFile(reservasPath, 'utf8' );
        const reservas = JSON.parse(data) || [];
        const reservaId = req.params.id;
        const index = reservas.findIndex(r => r.id === reservaId);

        if (index === -1) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Eliminar la reserva
        const [reservaEliminada] = reservas.splice(index, 1);
        await fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2));

        res.status(200).json({ message: 'Reserva eliminada', reserva: reservaEliminada });
    } catch (err) {
        console.error('Error al eliminar la reserva:', err);
        res.status(500).json({ error: 'Error al eliminar la reserva' });     
    }
};
    module.exports = {
        getReservas,
        getReservaById,
        createReserva,
        updateReserva,
        deleteReserva
    };

