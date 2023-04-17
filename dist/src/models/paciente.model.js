"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACIENTE_MODEL = void 0;
const mongoose_1 = require("mongoose");
const PACIENTE_SCHEMA = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
    },
    tipo_id: {
        type: String,
        required: true,
        maxlength: 2,
        enum: ["CC", "CE", "TI"], // CC. Cedula ciudadania CE. Cedula extranjera TI. Tarjeta de identificación
    },
    sexo: {
        type: String,
        required: true,
        enum: ["M", "F"],
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    correo: {
        type: String,
        maxlength: 40,
    },
    telefono: {
        type: String,
        maxlength: 10,
    },
    primer_nombre: {
        type: String,
        required: true,
    },
    segundo_nombre: {
        type: String,
        required: true,
    },
    primer_apellido: {
        type: String,
        required: true,
    },
    segundo_apellido: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.PACIENTE_MODEL = (0, mongoose_1.model)("paciente", PACIENTE_SCHEMA);
