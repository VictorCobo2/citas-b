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
exports.deleteProfesional = exports.putProfesional = exports.getProfesionales = exports.getProfesional = exports.postProfesional = void 0;
const global_1 = require("../helpers/global");
const models_1 = require("../models");
const postProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DATA = req.body;
    new models_1.PROFESIONAL_MODEL(DATA)
        .save()
        .then((profesional) => {
        if ("_id" in profesional)
            (0, global_1.msg_)("03", "Profesional", "success", res);
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
exports.postProfesional = postProfesional;
const getProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nombres, apellidos } = req.query;
    models_1.PROFESIONAL_MODEL.findOne({
        $or: [{ nombres, apellidos }, { id }],
    })
        .then((profesional) => {
        if (profesional === null || profesional === void 0 ? void 0 : profesional._id)
            res.send(profesional);
        else
            (0, global_1.msg_)("01", "profesional", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando profesional", "error", res);
        console.log(error);
    });
});
exports.getProfesional = getProfesional;
const getProfesionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.PROFESIONAL_MODEL.find()
        .then((profesional) => {
        if (profesional === null || profesional === void 0 ? void 0 : profesional.length)
            res.send(profesional);
        else
            (0, global_1.msg_)("01", "profesionales", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando profesionales", "error", res);
        console.log(error);
    });
});
exports.getProfesionales = getProfesionales;
const putProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    delete req.body.id;
    models_1.PROFESIONAL_MODEL.updateOne({ id }, req.body)
        .then((profesional) => {
        if (profesional.modifiedCount)
            (0, global_1.msg_)("04", "Profesional", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro profesional", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error modificando profesional", "error", res);
        console.log(error);
    });
});
exports.putProfesional = putProfesional;
const deleteProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    models_1.PROFESIONAL_MODEL.deleteOne({ id })
        .then((profesional) => {
        if (profesional.deletedCount)
            (0, global_1.msg_)("05", "Profesional", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro profesional", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error eliminando profesional", "error", res);
        console.log(error);
    });
});
exports.deleteProfesional = deleteProfesional;
