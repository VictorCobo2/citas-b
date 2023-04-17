import { Request, Response } from "express";
import { msg_ } from "../helpers/global";
import { PROFESIONAL_MODEL } from "../models";

export const postProfesional = async (req: Request, res: Response) => {
  const DATA = req.body;
  new PROFESIONAL_MODEL(DATA)
    .save()
    .then((profesional) => {
      if ("_id" in profesional) msg_("03", "Profesional", "success", res);
    })
    .catch((error) => {
      if (error.errors) {
        for (const propiedad in error.errors) return msg_("02", `${propiedad}`, "info", res);
      } else {
        for (const propiedad in error.keyPattern) return msg_("08", `${propiedad}`, "info", res);
      }
    });
};
export const getProfesional = async (req: Request, res: Response) => {
  const { id, nombres, apellidos } = req.query;
  PROFESIONAL_MODEL.findOne({
    $or: [{ nombres, apellidos }, { id }],
  })
    .then((profesional: any) => {
      if (profesional?._id) res.send(profesional);
      else msg_("01", "profesional", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando profesional", "error", res);
      console.log(error);
    });
};
export const getProfesionales = async (req: Request, res: Response) => {
  PROFESIONAL_MODEL.find()
    .then((profesional) => {
      if (profesional?.length) res.send(profesional);
      else msg_("01", "profesionales", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando profesionales", "error", res);
      console.log(error);
    });
};
export const putProfesional = async (req: Request, res: Response) => {
  const { id } = req.body;
  delete req.body.id;
  PROFESIONAL_MODEL.updateOne({ id }, req.body)
    .then((profesional) => {
      if (profesional.modifiedCount) msg_("04", "Profesional", "success", res);
      else msg_("?", "No se encontro profesional", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error modificando profesional", "error", res);
      console.log(error);
    });
};
export const deleteProfesional = async (req: Request, res: Response) => {
  const { id } = req.query;
  PROFESIONAL_MODEL.deleteOne({ id })
    .then((profesional) => {
      if (profesional.deletedCount) msg_("05", "Profesional", "success", res);
      else msg_("?", "No se encontro profesional", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error eliminando profesional", "error", res);
      console.log(error);
    });
};
