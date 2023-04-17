import { Schema, model, ObjectId } from "mongoose";

interface cita {
  fecha: Date;
  id_paciente: ObjectId;
  id_profesional: ObjectId;
  eps: string;
}

const CITA_SCHEMA = new Schema<cita>(
  {
    fecha: {
      type: Date,
      required: true,
    },
    id_paciente: {
      type: Schema.Types.ObjectId,
      ref: "paciente",
    },
    id_profesional: {
      type: Schema.Types.ObjectId,
      ref: "profesional",
    },
    eps: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const CITA_MODEL = model<cita>("cita", CITA_SCHEMA);
