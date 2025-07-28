import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 of the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "bruh", price: 20 })
    .expect(404);
});
it("returns 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "bruh", price: 20 })
    .expect(401);
});
it("returns 401 if user does not own the ticket", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10, title: "aaa" });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "bbb", price: 1000 })
    .expect(401);
});
it("returns 400 if the user provides invalid title or price", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ price: 10, title: "aaa" });
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ price: -10, title: "aaa" })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ price: 10 })
    .expect(400);
});
it("updates the tickets provided valid inputs", async () => {
  const cookie = global.signin();
  let res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ price: 10, title: "aaa" });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "bbb", price: 2000 })
    .expect(201);

  res = await request(app).get(`/api/tickets/${res.body.id}`).send();

  expect(res.body.title).toEqual("bbb");
  expect(res.body.price).toEqual(2000);
});
