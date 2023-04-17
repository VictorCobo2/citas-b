"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padStart_ = exports.msg_ = void 0;
const msg_alerta_1 = require("./msg.alerta");
const msg_ = (code, msg, tipo, res) => {
    return (0, msg_alerta_1.findMsg_)(code, msg, tipo, res);
};
exports.msg_ = msg_;
const padStart_ = (str, len, padstr) => {
    let redExpr = {
        $reduce: {
            input: { $range: [0, { $subtract: [len, { $strLenCP: str }] }] },
            initialValue: "",
            in: { $concat: ["$$value", padstr] },
        },
    };
    return {
        $cond: {
            if: { $gte: [{ $strLenCP: str }, len] },
            then: str,
            else: { $concat: [redExpr, str] },
        },
    };
};
exports.padStart_ = padStart_;
