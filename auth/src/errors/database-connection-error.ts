import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting to db"); //just for logs
    //only because we are extending a buildin class

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
