import { Request, Response } from "express";
import { msg_ } from "../helpers/global";
import { PACIENTE_MODEL } from "../models";

export const postPaciente = async (req: Request, res: Response) => {
  const DATA = req.body;
  new PACIENTE_MODEL(DATA)
    .save()
    .then((paciente) => {
      if ("_id" in paciente) msg_("03", "Paciente", "success", res);
    })
    .catch((error) => {
      if (error.errors) {
        for (const propiedad in error.errors) return msg_("02", `${propiedad}`, "info", res);
      } else {
        for (const propiedad in error.keyPattern) return msg_("08", `${propiedad}`, "info", res);
      }
    });
};
export const getPaciente = async (req: Request, res: Response) => {
  const { id, nombres, apellidos } = req.query;
  PACIENTE_MODEL.findOne({
    $or: [{ nombres, apellidos }, { id }],
  })
    .then((paciente: any) => {
      if (paciente?._id) res.send(paciente);
      else msg_("01", "paciente", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando paciente", "error", res);
      console.log(error);
    });
};
export const getPacientes = async (req: Request, res: Response) => {
  PACIENTE_MODEL.find()
    .then((paciente) => {
      if (paciente.length) res.send(paciente);
      else msg_("01", "pacientes", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando pacientes", "error", res);
      console.log(error);
    });
};
export const putPaciente = async (req: Request, res: Response) => {
  const { id } = req.body;
  delete req.body.id;
  PACIENTE_MODEL.updateOne({ id }, req.body)
    .then((paciente) => {
      if (paciente.modifiedCount) msg_("04", "Paciente", "success", res);
      else msg_("?", "No se encontro paciente", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error modificando paciente", "error", res);
      console.log(error);
    });
};
export const deletePaciente = async (req: Request, res: Response) => {
  const { id } = req.query;
  PACIENTE_MODEL.deleteOne({ id })
    .then((paciente) => {
      if (paciente.deletedCount) msg_("05", "Paciente", "success", res);
      else msg_("?", "No se encontro paciente", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error eliminando paciente", "error", res);
      console.log(error);
    });
};
