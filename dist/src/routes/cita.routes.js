"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CITA = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.CITA = express_1.default.Router();
exports.CITA.get("/get-citas", controllers_1.getCitas);
exports.CITA.post("/post-cita", controllers_1.postCita);
exports.CITA.put("/put-cita/:_id", controllers_1.putCita);
exports.CITA.get("/get-cita/:id_paciente/:fecha", controllers_1.getCita);
exports.CITA.delete("/delete-cita/:_id", controllers_1.deleteCita);
