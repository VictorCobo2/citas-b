import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const JwtGenerator_ = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      `${process.env.SECRETKEY}`,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se genero el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const JwtValidate_ = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("Se intento ingresar sin token");
    return res.status(401).json({
      msg: "No tienes acceso.",
    });
  }

  try {
    jwt.verify(token.split(" ")[1], `${process.env.SECRETKEY}`);
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Acceso denegado, no tiene token correcto",
    });
  }
};
