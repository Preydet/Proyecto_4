Proyecto: API de Reservas de Hoteles
------------------------------------
Esta API estará desplegada en Render.com

Descripción:
API REST para gestionar reservas de hoteles. Permite crear, leer, actualizar y eliminar reservas, así como filtrar por hotel, tipo de habitación, estado, número de huéspedes y fechas.

Tecnologías:
- Node.js
- Express
- UUID para identificación de reservas
- JSON como almacenamiento de datos (reservas.json)
- CORS habilitado

Estructura del proyecto:
- server.js          -> Archivo principal para iniciar el servidor
- /routers           -> Contiene rutas de la API (reservasRouter.js)
- /controllers       -> Contiene la lógica de cada endpoint (reservasController.js)
- /models            -> Contiene la clase Booking (model.js)
- reservas.json      -> Archivo donde se almacenan las reservas

Endpoints:

1. Obtener todas las reservas / Filtrar reservas
   GET /api/reservas
   Query parameters opcionales:
     - hotel
     - tipo_habitacion
     - estado
     - num_huespedes
     - fecha_inicio
     - fecha_fin

   Ejemplo:
     GET /api/reservas?hotel=Paraíso&estado=pendiente

2. Crear una nueva reserva
   POST /api/reservas
   Body JSON obligatorio:
   {
     "hotel": "Hotel Paraíso",
     "tipo_habitacion": "Doble",
     "num_huespedes": 2,
     "fecha_inicio": "2025-12-10",
     "fecha_fin": "2025-12-15",
     "estado": "pendiente"   <-- opcional
   }

3. Actualizar una reserva
   PUT /api/reservas/:id
   Body JSON con los campos a modificar.
   Ejemplo:
   {
     "estado": "confirmada"
   }

4. Eliminar una reserva
   DELETE /api/reservas/:id

Pruebas:
- Usar Postman o Thunder Client para probar los endpoints.
- Asegurarse de enviar JSON válido (sin coma al final).

Notas:
- Las reservas se almacenan en el archivo `reservas.json`.
- Los IDs se generan automáticamente con UUID.
- Los filtros en GET /api/reservas permiten consultas combinadas.
- No se menciona el puerto del servidor; Render.com asigna automáticamente la URL de despliegue.
