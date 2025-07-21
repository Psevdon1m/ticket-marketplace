import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Error passing correct params"); //just for logs

    //only because we are extending a buildin class

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((e: ValidationError) => {
      return {
        message: e.msg,
        //@ts-ignore for some reasons ts says path is not in e object, but when logining the e obj, the path is indeed there
        field: e.path,
      };
    });
  }
}
