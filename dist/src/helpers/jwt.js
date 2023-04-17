"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidate_ = exports.JwtGenerator_ = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtGenerator_ = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, `${process.env.SECRETKEY}`, {
            expiresIn: "24h",
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se genero el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.JwtGenerator_ = JwtGenerator_;
const JwtValidate_ = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log("Se intento ingresar sin token");
        return res.status(401).json({
            msg: "No tienes acceso.",
        });
    }
    try {
        jsonwebtoken_1.default.verify(token.split(" ")[1], `${process.env.SECRETKEY}`);
        return next();
    }
    catch (error) {
        return res.status(401).json({
            msg: "Acceso denegado, no tiene token correcto",
        });
    }
};
exports.JwtValidate_ = JwtValidate_;
