import { Schema, model } from "mongoose";

interface paciente {
  id: string;
  tipo_id: string;
  sexo: string;
  fecha_nacimiento: Date;
  correo: string;
  telefono: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  direccion: string;
}

const PACIENTE_SCHEMA = new Schema<paciente>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
    },
    tipo_id: {
      type: String,
      required: true,
      maxlength: 2,
      enum: ["CC", "CE", "TI"], // CC. Cedula ciudadania CE. Cedula extranjera TI. Tarjeta de identificación
    },
    sexo: {
      type: String,
      required: true,
      enum: ["M", "F"],
    },
    fecha_nacimiento: {
      type: Date,
      required: true,
    },
    correo: {
      type: String,
      maxlength: 40,
    },
    telefono: {
      type: String,
      maxlength: 10,
    },
    primer_nombre: {
      type: String,
      required: true,
    },
    segundo_nombre: {
      type: String,
      required: true,
    },
    primer_apellido: {
      type: String,
      required: true,
    },
    segundo_apellido: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PACIENTE_MODEL = model<paciente>("paciente", PACIENTE_SCHEMA);
