import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "bruh", price: 20.1 });
};

it("returns all tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const res = await request(app).get("/api/tickets").send().expect(200);
  expect(res.body.length).toEqual(3);
});
