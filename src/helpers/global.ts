import { Response } from "express";
import { findMsg_ } from "./msg.alerta";

export const msg_ = (code: String, msg: String, tipo: String, res: Response) => {
  return findMsg_(code, msg, tipo, res);
};
export const padStart_ = (str: any, len: any, padstr: string) => {
  let redExpr = {
    $reduce: {
      input: { $range: [0, { $subtract: [len, { $strLenCP: str }] }] },
      initialValue: "",
      in: { $concat: ["$$value", padstr] },
    },
  };
  return {
    $cond: {
      if: { $gte: [{ $strLenCP: str }, len] },
      then: str,
      else: { $concat: [redExpr, str] },
    },
  };
};
