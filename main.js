require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//Importar rutas
const reservasRoutes = require('./routers/reservasRouter');
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Accede a: http://localhost:${PORT}`);
});