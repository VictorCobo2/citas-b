import { Request, Response } from "express";
import { CITA_MODEL } from "../models";
import { msg_ } from "../helpers/global";

export const postCita = async (req: Request, res: Response) => {
  const DATA = req.body;
  new CITA_MODEL(DATA)
    .save()
    .then((cita) => {
      if ("_id" in cita) msg_("?", "Cita agendada correctamente", "success", res);
    })
    .catch((error) => {
      if (error.errors) for (const propiedad in error.errors) msg_("05", propiedad, "info", res);
      else for (const propiedad in error.keyPattern) msg_("08", propiedad, "info", res);
    });
};

export const getCita = async (req: Request, res: Response) => {
  const { id_paciente, fecha } = req.params;
  const formateo = req.params?.fecha.replace(" ", "");
  const fecha_format = new Date(formateo);

  CITA_MODEL.findOne({ fecha: fecha_format })
    .populate({
      path: "id_paciente",
      select: {},
      match: { id: id_paciente }, // Puedes agregar una condición adicional para la búsqueda en el modelo de paciente
    })
    .populate("id_profesional")
    .then((cita: any) => {
      if (!cita.id_paciente || cita.id_profesional)
        return msg_("?", "No existe ninguna cita agendada", "error", res);
      if (cita._id) res.send(cita);
      else msg_("01", "cita", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando cita", "error", res);
      console.log(error);
    });
};

export const getCitas = async (req: Request, res: Response) => {
  CITA_MODEL.find()
    .populate("id_profesional")
    .populate("id_paciente")
    .then((cita) => {
      if (cita.length) res.send(cita);
      else msg_("01", "citas", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error consultando citas", "error", res);
      console.log(error);
    });
};

export const putCita = async (req: Request, res: Response) => {
  const { _id } = req.params;
  if (!_id) return msg_("?", "Tienes qeue enviar los parametros", "info", res);
  CITA_MODEL.updateOne({ _id }, req.body)
    .then((cita) => {
      if (cita.modifiedCount) msg_("04", "Cita", "success", res);
      else msg_("?", "No se encontro cita", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error modificando cita", "error", res);
      console.log(error);
    });
};

export const deleteCita = async (req: Request, res: Response) => {
  const { _id } = req.params;
  if (!_id) return msg_("08", "eliminar", "info", res);
  CITA_MODEL.deleteOne({ _id })
    .then((cita) => {
      if (cita.deletedCount) msg_("05", "Cita", "success", res);
      else msg_("?", "No se encontro la cita", "info", res);
    })
    .catch((error) => {
      msg_("?", "Error eliminando cita", "error", res);
      console.log(error);
    });
};
