const mongoose = require('mongoose');
const { Schema } = mongoose;

const prestamoSchema = new Schema({
    persona: { type: String, require: true },
    equipamiento: { type: String, require: true },
    estado: { type: String, require: true },
    fechainicio: { type: String, require: true },
    fechafin: { type: String, require: true },
    fechaentrega: { type: String, require: true }
});

module.exports = mongoose.model('Prestamo', prestamoSchema);