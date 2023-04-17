"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CITA_MODEL = void 0;
const mongoose_1 = require("mongoose");
const CITA_SCHEMA = new mongoose_1.Schema({
    fecha: {
        type: Date,
        required: true,
    },
    id_paciente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "paciente",
    },
    id_profesional: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "profesional",
    },
    eps: {
        required: true,
        type: String,
    },
}, { timestamps: true });
exports.CITA_MODEL = (0, mongoose_1.model)("cita", CITA_SCHEMA);
