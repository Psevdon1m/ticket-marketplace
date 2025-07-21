import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
  statusCode = 503;
  reason = "Error connecting to database";
  constructor() {
    super();

    //only because we are extending a buildin class

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
