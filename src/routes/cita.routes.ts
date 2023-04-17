import express from "express";
import { postCita, getCita, getCitas, putCita, deleteCita } from "../controllers";

export const CITA = express.Router();

CITA.get("/get-citas", getCitas);
CITA.post("/post-cita", postCita);
CITA.put("/put-cita/:_id", putCita);
CITA.get("/get-cita/:id_paciente/:fecha", getCita);
CITA.delete("/delete-cita/:_id", deleteCita);
