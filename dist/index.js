"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const routes = __importStar(require("./src/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.clear();
const PORT = process.env.PORT || 30002;
const MONGO_URI = process.env.MONGO_URI_DEV || "mongodb://localhost:27017/CitasOdont";
const APP = (0, express_1.default)();
mongoose_1.default.set("strictQuery", true);
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
APP.use(express_1.default.json());
APP.get("/", (req, res) => {
    res.send("Servidor iniciado existosamente 🟢");
});
APP.get("/api", (req, res) => {
    res.send("API funcionando correctamente 🟢");
});
APP.use("/api", routes.PROFESIONAL);
APP.use("/api", routes.PACIENTE);
APP.use("/api", routes.USUARIO);
APP.use("/api", routes.CITA);
APP.use((req, res) => res.status(404).send("ERROR path not found."));
mongoose_1.default
    .connect(`${MONGO_URI}`)
    .then(() => {
    console.log("Connected succes mongoDB  🟢");
})
    .catch((error) => {
    console.log("error contected mongoDb 🔴");
    console.log(error);
});
APP.listen(PORT, () => console.log(`API lisening: http://localhost:${PORT}`));
