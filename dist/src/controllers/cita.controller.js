"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCita = exports.putCita = exports.getCitas = exports.getCita = exports.postCita = void 0;
const models_1 = require("../models");
const global_1 = require("../helpers/global");
const postCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DATA = req.body;
    new models_1.CITA_MODEL(DATA)
        .save()
        .then((cita) => {
        if ("_id" in cita)
            (0, global_1.msg_)("?", "Cita agendada correctamente", "success", res);
    })
        .catch((error) => {
        if (error.errors)
            for (const propiedad in error.errors)
                (0, global_1.msg_)("05", propiedad, "info", res);
        else
            for (const propiedad in error.keyPattern)
                (0, global_1.msg_)("08", propiedad, "info", res);
    });
});
exports.postCita = postCita;
const getCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id_paciente, fecha } = req.params;
    const formateo = (_a = req.params) === null || _a === void 0 ? void 0 : _a.fecha.replace(" ", "");
    const fecha_format = new Date(formateo);
    models_1.CITA_MODEL.findOne({ fecha: fecha_format })
        .populate({
        path: "id_paciente",
        select: {},
        match: { id: id_paciente }, // Puedes agregar una condición adicional para la búsqueda en el modelo de paciente
    })
        .populate("id_profesional")
        .then((cita) => {
        if (!cita.id_paciente || cita.id_profesional)
            return (0, global_1.msg_)("?", "No existe ninguna cita agendada", "error", res);
        if (cita._id)
            res.send(cita);
        else
            (0, global_1.msg_)("01", "cita", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando cita", "error", res);
        console.log(error);
    });
});
exports.getCita = getCita;
const getCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.CITA_MODEL.find()
        .populate("id_profesional")
        .populate("id_paciente")
        .then((cita) => {
        if (cita.length)
            res.send(cita);
        else
            (0, global_1.msg_)("01", "citas", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando citas", "error", res);
        console.log(error);
    });
});
exports.getCitas = getCitas;
const putCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id)
        return (0, global_1.msg_)("?", "Tienes qeue enviar los parametros", "info", res);
    models_1.CITA_MODEL.updateOne({ _id }, req.body)
        .then((cita) => {
        if (cita.modifiedCount)
            (0, global_1.msg_)("04", "Cita", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro cita", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error modificando cita", "error", res);
        console.log(error);
    });
});
exports.putCita = putCita;
const deleteCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id)
        return (0, global_1.msg_)("08", "eliminar", "info", res);
    models_1.CITA_MODEL.deleteOne({ _id })
        .then((cita) => {
        if (cita.deletedCount)
            (0, global_1.msg_)("05", "Cita", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro la cita", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error eliminando cita", "error", res);
        console.log(error);
    });
});
exports.deleteCita = deleteCita;
