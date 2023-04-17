"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFESIONAL = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.PROFESIONAL = express_1.default.Router();
exports.PROFESIONAL.get("/get-profesionales", controllers_1.getProfesionales);
exports.PROFESIONAL.post("/post-profesional", controllers_1.postProfesional);
exports.PROFESIONAL.put("/put-profesional", controllers_1.putProfesional);
exports.PROFESIONAL.get("/get-profesional", controllers_1.getProfesional);
exports.PROFESIONAL.delete("/delete-profesional", controllers_1.deleteProfesional);
