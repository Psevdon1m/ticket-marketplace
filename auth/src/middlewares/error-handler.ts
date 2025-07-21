import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { ValidationError } from "express-validator";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();

    return res.status(err.statusCode).send({ errors });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
