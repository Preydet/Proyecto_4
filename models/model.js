class booking {
  constructor(id, hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado = 'pendiente') {
    this.id = id;
    this.hotel = hotel;
    this.tipo_habitacion = tipo_habitacion;
    this.num_huespedes = num_huespedes;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.estado = estado;
  }
}
module.exports = booking;