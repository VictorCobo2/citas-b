import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import * as routes from "./src/routes";

dotenv.config();
console.clear();

const PORT = process.env.PORT || 30002;
const MONGO_URI = process.env.MONGO_URI_DEV || "mongodb://localhost:27017/CitasOdont";
const APP = express();

mongoose.set("strictQuery", true);

APP.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

APP.use(express.json());

APP.get("/", (req: Request, res: Response) => {
  res.send("Servidor iniciado existosamente 🟢");
});
APP.get("/api", (req: Request, res: Response) => {
  res.send("API funcionando correctamente 🟢");
});

APP.use("/api", routes.PROFESIONAL);
APP.use("/api", routes.PACIENTE);
APP.use("/api", routes.USUARIO);
APP.use("/api", routes.CITA);

APP.use((req: Request, res: Response) => res.status(404).send("ERROR path not found."));

mongoose
  .connect(`${MONGO_URI}`)
  .then(() => {
    console.log("Connected succes mongoDB  🟢");
  })
  .catch((error: any) => {
    console.log("error contected mongoDb 🔴");
    console.log(error);
  });

APP.listen(PORT, () => console.log(`API lisening: http://localhost:${PORT}`));
