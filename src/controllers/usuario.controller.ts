import { Request, Response } from "express";
import { msg_ } from "../helpers/global";
import { JwtGenerator_ } from "../helpers/jwt";
import { USUARIO_MODEL } from "../models";
import bcrypt from "bcrypt";

export const postUsuario = async (req: Request, res: Response) => {
  const DATA = req.body;
  new USUARIO_MODEL(DATA)
    .save()
    .then((usuario) => {
      if ("_id" in usuario) msg_("03", "Usuario", "success", res);
    })
    .catch((error) => {
      if (error.errors) for (const propiedad in error.errors) msg_("05", propiedad, "info", res);
      else for (const propiedad in error.keyPattern) msg_("08", propiedad, "info", res);
    });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { nombre_usu, contrasena } = req.query;
  USUARIO_MODEL.findOne({ nombre_usu })
    .populate("id_profesional")
    .lean()
    .then(async (usuario: any) => {
      if (usuario?._id) {
        const flag_contrasena =
          typeof contrasena === "string" &&
          bcrypt.compareSync(contrasena ?? "", usuario.contrasena);
        if (flag_contrasena) {
          const token = await JwtGenerator_(usuario.id);
          delete usuario.contrasena;
          res.send({ token, usuario });
        } else msg_("?", "usuario o contraseña incorrecta", "info", res);
      } else msg_("01", "usuario", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando usuario", "error", res);
      console.log(error);
    });
};

export const getUsuarios = async (req: Request, res: Response) => {
  USUARIO_MODEL.find()
    .then((usuarios) => {
      if (usuarios.length) res.send(usuarios);
      else msg_("01", "usuarios", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando usuarios", "error", res);
      console.log(error);
    });
};

export const putUsuario = async (req: Request, res: Response) => {
  const { nombre_usu } = req.body;
  delete req.body.nombre_usu;
  delete req.body.contrasena;

  USUARIO_MODEL.updateOne({ nombre_usu }, req.body)
    .then((usuario) => {
      if (usuario.modifiedCount) msg_("04", "Usuario", "success", res);
      else msg_("?", "No se encontro usuario", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error modificando usuario", "error", res);
      console.log(error);
    });
};
export const changePassword = async (req: Request, res: Response) => {
  const { nombre_usu, contrasena } = req.body;
  delete req.body.nombre_usu;

  const hashPassword = (password: string) => {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  };
  try {
    const hash = await hashPassword(contrasena);
    req.body.contrasena = hash;
    const usuario = await USUARIO_MODEL.updateOne({ nombre_usu }, req.body);
    if (usuario.modifiedCount) msg_("?", "Clave modificada correctamente", "success", res);
    else msg_("?", "No se encontro usuario", "info", res);
  } catch (error) {
    msg_("?", "Error modificando usuario", "error", res);
    console.log(error);
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { nombre_usu } = req.query;
  USUARIO_MODEL.deleteOne({ nombre_usu })
    .then((usuario) => {
      if (usuario.deletedCount) msg_("05", "usuario", "success", res);
      else msg_("?", "No se encontro usuario", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error eliminando usuario", "error", res);
      console.log(error);
    });
};
