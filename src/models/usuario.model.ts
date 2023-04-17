import { Schema, model, ObjectId, SchemaType, SchemaTypes } from "mongoose";
import bcrypt from "bcrypt";

interface usario {
  nombre_usu: string;
  contrasena: string;
  id_profesional: ObjectId;
}

const USUARIO_SCHEMA = new Schema<usario>(
  {
    nombre_usu: {
      type: String,
      unique: true,
      required: true,
      maxlength: 20,
    },
    contrasena: {
      type: String,
      required: true,
      maxlength: 15,
    },
    id_profesional: {
      type: Schema.Types.ObjectId,
      ref: "profesional",
    },
  },
  { timestamps: true }
);

USUARIO_SCHEMA.pre("save", function (next) {
  bcrypt.hash(this.contrasena, 10, (err, hash) => {
    err ? next(new Error("F")) : (this.contrasena = hash), next();
  });
});

USUARIO_SCHEMA.index({ nombre_usu: 1 }, { unique: true });

export const USUARIO_MODEL = model<usario>("usuario", USUARIO_SCHEMA);
