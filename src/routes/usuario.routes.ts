import express from "express";
import {
  postUsuario,
  getUsuario,
  getUsuarios,
  putUsuario,
  deleteUsuario,
  changePassword,
} from "../controllers";

export const USUARIO = express.Router();

USUARIO.put("/put-usuario", putUsuario);
USUARIO.get("/get-usuario", getUsuario);
USUARIO.get("/get-usuarios", getUsuarios);
USUARIO.post("/post-usuario", postUsuario);
USUARIO.delete("/delete-usuario", deleteUsuario);
USUARIO.put("/change-password-usuario", changePassword);
