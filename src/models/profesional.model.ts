import { Schema, model } from "mongoose";

interface profesional {
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
  profesion: string;
}

const PROFESIONAL_SCHEMA = new Schema<profesional>(
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
    profesion: {
      type: String,
      maxlength: 1,
      enum: ["0", "1", "2", "3"], // 0. Medico general 1. Enfermera 2. Auxiliarde enfermeria 3. Odontologo
    },
  },
  { timestamps: true }
);

export const PROFESIONAL_MODEL = model<profesional>("profesional", PROFESIONAL_SCHEMA);
