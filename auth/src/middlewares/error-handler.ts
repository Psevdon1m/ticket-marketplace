import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { ValidationError } from "express-validator";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const errors = err.serializeErrors();

    return res.status(err.statusCode).send({ errors });
  }

  if (err instanceof DatabaseConnectionError) {
    const errors = err.serializeErrors();
    return res.status(err.statusCode).send({ errors });
  }
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
