import express from "express";
import {
  postPaciente,
  getPaciente,
  getPacientes,
  putPaciente,
  deletePaciente,
} from "../controllers";

export const PACIENTE = express.Router();

PACIENTE.get("/get-pacientes", getPacientes);
PACIENTE.post("/post-paciente", postPaciente);
PACIENTE.put("/put-paciente", putPaciente);
PACIENTE.get("/get-paciente", getPaciente);
PACIENTE.delete("/delete-paciente", deletePaciente);
