"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMsg_ = void 0;
const findMsg_ = (code, msg, tipo, res) => {
    const MSG = [
        { code: "01", msg: `No existe ${msg}`, tipo },
        { code: "02", msg: `${msg} es requerido `, tipo },
        { code: "03", msg: `${msg} creado correctamente`, tipo },
        { code: "04", msg: `${msg} modificado correctamente`, tipo },
        { code: "05", msg: `${msg} eliminado correctamente`, tipo },
        { code: "06", msg: `Caduco la sesión`, tipo },
        { code: "07", msg: `No cuenta con los privilegios necesarios`, tipo },
        { code: "08", msg: `El ${msg} esta duplicado`, tipo },
        { code: "09", msg: `Usuario o contraseña incorrectos, intentalo de nuevo`, tipo },
        { code: "10", msg: `Documento ${msg} correctamente`, tipo: "success" },
        { code: "11", msg: msg, tipo },
        { code: "13", msg: `No existen documentos.`, tipo },
        { code: "14", msg: `No hubo campos modificados.`, tipo },
        { code: "?", msg: `${msg}`, tipo },
    ];
    const RES = MSG.find((e) => e.code == code);
    return RES ? res.json(RES) : msg;
};
exports.findMsg_ = findMsg_;
