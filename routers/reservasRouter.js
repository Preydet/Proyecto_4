const express = require('express');
const router = express.Router();
const { getReservas, getReservaById, createReserva, updateReserva, deleteReserva } = require('../controllers/reservasController');

// Ruta para obtener todas las reservas
router.get('/', getReservas);
// Ruta para obtener una reserva por ID
router.get('/:id', getReservaById);
// Ruta para crear una nueva reserva
router.post('/', createReserva);
// Ruta para actualizar una reserva existente
router.put('/:id', updateReserva);
// Ruta para eliminar una reserva existente
router.delete('/:id', deleteReserva);

module.exports = router;