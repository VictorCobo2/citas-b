import express from "express";
import {
  postProfesional,
  getProfesional,
  getProfesionales,
  putProfesional,
  deleteProfesional,
} from "../controllers";

export const PROFESIONAL = express.Router();

PROFESIONAL.get("/get-profesionales", getProfesionales);
PROFESIONAL.post("/post-profesional", postProfesional);
PROFESIONAL.put("/put-profesional", putProfesional);
PROFESIONAL.get("/get-profesional", getProfesional);
PROFESIONAL.delete("/delete-profesional", deleteProfesional);
