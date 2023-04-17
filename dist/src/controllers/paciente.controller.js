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
exports.deletePaciente = exports.putPaciente = exports.getPacientes = exports.getPaciente = exports.postPaciente = void 0;
const global_1 = require("../helpers/global");
const models_1 = require("../models");
const postPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DATA = req.body;
    new models_1.PACIENTE_MODEL(DATA)
        .save()
        .then((paciente) => {
        if ("_id" in paciente)
            (0, global_1.msg_)("03", "Paciente", "success", res);
    })
        .catch((error) => {
        if (error.errors) {
            for (const propiedad in error.errors)
                return (0, global_1.msg_)("02", `${propiedad}`, "info", res);
        }
        else {
            for (const propiedad in error.keyPattern)
                return (0, global_1.msg_)("08", `${propiedad}`, "info", res);
        }
    });
});
exports.postPaciente = postPaciente;
const getPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nombres, apellidos } = req.query;
    models_1.PACIENTE_MODEL.findOne({
        $or: [{ nombres, apellidos }, { id }],
    })
        .then((paciente) => {
        if (paciente === null || paciente === void 0 ? void 0 : paciente._id)
            res.send(paciente);
        else
            (0, global_1.msg_)("01", "paciente", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando paciente", "error", res);
        console.log(error);
    });
});
exports.getPaciente = getPaciente;
const getPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.PACIENTE_MODEL.find()
        .then((paciente) => {
        if (paciente.length)
            res.send(paciente);
        else
            (0, global_1.msg_)("01", "pacientes", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando pacientes", "error", res);
        console.log(error);
    });
});
exports.getPacientes = getPacientes;
const putPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    delete req.body.id;
    models_1.PACIENTE_MODEL.updateOne({ id }, req.body)
        .then((paciente) => {
        if (paciente.modifiedCount)
            (0, global_1.msg_)("04", "Paciente", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro paciente", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error modificando paciente", "error", res);
        console.log(error);
    });
});
exports.putPaciente = putPaciente;
const deletePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    models_1.PACIENTE_MODEL.deleteOne({ id })
        .then((paciente) => {
        if (paciente.deletedCount)
            (0, global_1.msg_)("05", "Paciente", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro paciente", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error eliminando paciente", "error", res);
        console.log(error);
    });
});
exports.deletePaciente = deletePaciente;
