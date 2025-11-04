const express = require('express');
const router = express.Router();
const { getReservas } = require('../controllers/reservasController');

// Ruta para obtener todas las reservas
router.get('/', getReservas);

module.exports = router;