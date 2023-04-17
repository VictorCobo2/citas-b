"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USUARIO = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.USUARIO = express_1.default.Router();
exports.USUARIO.put("/put-usuario", controllers_1.putUsuario);
exports.USUARIO.get("/get-usuario", controllers_1.getUsuario);
exports.USUARIO.get("/get-usuarios", controllers_1.getUsuarios);
exports.USUARIO.post("/post-usuario", controllers_1.postUsuario);
exports.USUARIO.delete("/delete-usuario", controllers_1.deleteUsuario);
exports.USUARIO.put("/change-password-usuario", controllers_1.changePassword);
