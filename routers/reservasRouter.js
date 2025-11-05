const express = require('express');
const router = express.Router();
const { getReservas, createReserva } = require('../controllers/reservasController');

// Ruta para obtener todas las reservas
router.get('/', getReservas);
// Ruta para crear una nueva reserva
router.post('/', createReserva);

module.exports = router;