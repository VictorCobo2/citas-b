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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.changePassword = exports.putUsuario = exports.getUsuarios = exports.getUsuario = exports.postUsuario = void 0;
const global_1 = require("../helpers/global");
const jwt_1 = require("../helpers/jwt");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DATA = req.body;
    new models_1.USUARIO_MODEL(DATA)
        .save()
        .then((usuario) => {
        if ("_id" in usuario)
            (0, global_1.msg_)("03", "Usuario", "success", res);
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
exports.postUsuario = postUsuario;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usu, contrasena } = req.query;
    models_1.USUARIO_MODEL.findOne({ nombre_usu })
        .populate("id_profesional")
        .lean()
        .then((usuario) => __awaiter(void 0, void 0, void 0, function* () {
        if (usuario === null || usuario === void 0 ? void 0 : usuario._id) {
            const flag_contrasena = typeof contrasena === "string" &&
                bcrypt_1.default.compareSync(contrasena !== null && contrasena !== void 0 ? contrasena : "", usuario.contrasena);
            if (flag_contrasena) {
                const token = yield (0, jwt_1.JwtGenerator_)(usuario.id);
                delete usuario.contrasena;
                res.send({ token, usuario });
            }
            else
                (0, global_1.msg_)("?", "usuario o contraseña incorrecta", "info", res);
        }
        else
            (0, global_1.msg_)("01", "usuario", "info", res);
    }))
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando usuario", "error", res);
        console.log(error);
    });
});
exports.getUsuario = getUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    models_1.USUARIO_MODEL.find()
        .then((usuarios) => {
        if (usuarios.length)
            res.send(usuarios);
        else
            (0, global_1.msg_)("01", "usuarios", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error consultando usuarios", "error", res);
        console.log(error);
    });
});
exports.getUsuarios = getUsuarios;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usu } = req.body;
    delete req.body.nombre_usu;
    delete req.body.contrasena;
    models_1.USUARIO_MODEL.updateOne({ nombre_usu }, req.body)
        .then((usuario) => {
        if (usuario.modifiedCount)
            (0, global_1.msg_)("04", "Usuario", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro usuario", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error modificando usuario", "error", res);
        console.log(error);
    });
});
exports.putUsuario = putUsuario;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usu, contrasena } = req.body;
    delete req.body.nombre_usu;
    const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, 10, (err, hash) => {
                if (err)
                    reject(err);
                else
                    resolve(hash);
            });
        });
    };
    try {
        const hash = yield hashPassword(contrasena);
        req.body.contrasena = hash;
        const usuario = yield models_1.USUARIO_MODEL.updateOne({ nombre_usu }, req.body);
        if (usuario.modifiedCount)
            (0, global_1.msg_)("?", "Clave modificada correctamente", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro usuario", "info", res);
    }
    catch (error) {
        (0, global_1.msg_)("?", "Error modificando usuario", "error", res);
        console.log(error);
    }
});
exports.changePassword = changePassword;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usu } = req.query;
    models_1.USUARIO_MODEL.deleteOne({ nombre_usu })
        .then((usuario) => {
        if (usuario.deletedCount)
            (0, global_1.msg_)("05", "usuario", "success", res);
        else
            (0, global_1.msg_)("?", "No se encontro usuario", "info", res);
    })
        .catch((error) => {
        (0, global_1.msg_)("?", "Error eliminando usuario", "error", res);
        console.log(error);
    });
});
exports.deleteUsuario = deleteUsuario;
