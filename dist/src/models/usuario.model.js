"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USUARIO_MODEL = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const USUARIO_SCHEMA = new mongoose_1.Schema({
    nombre_usu: {
        type: String,
        unique: true,
        required: true,
        maxlength: 20,
    },
    contrasena: {
        type: String,
        required: true,
        maxlength: 15,
    },
    id_profesional: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "profesional",
    },
}, { timestamps: true });
USUARIO_SCHEMA.pre("save", function (next) {
    bcrypt_1.default.hash(this.contrasena, 10, (err, hash) => {
        err ? next(new Error("F")) : (this.contrasena = hash), next();
    });
});
USUARIO_SCHEMA.index({ nombre_usu: 1 }, { unique: true });
exports.USUARIO_MODEL = (0, mongoose_1.model)("usuario", USUARIO_SCHEMA);
