"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACIENTE = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.PACIENTE = express_1.default.Router();
exports.PACIENTE.get("/get-pacientes", controllers_1.getPacientes);
exports.PACIENTE.post("/post-paciente", controllers_1.postPaciente);
exports.PACIENTE.put("/put-paciente", controllers_1.putPaciente);
exports.PACIENTE.get("/get-paciente", controllers_1.getPaciente);
exports.PACIENTE.delete("/delete-paciente", controllers_1.deletePaciente);
