import express from "express";
import { json } from "body-parser";
import { createTicketRouter } from "./routes/new";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@ticketsvo/common";
import { showTicketRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all(/.*/, async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
