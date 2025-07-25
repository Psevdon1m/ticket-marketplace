import request from "supertest";
import { app } from "../../app";

it("returns 200 on successfull signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "val@mail.com",
      password: "password",
    })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "val@mail.com",
      password: "password",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
it("fails if pass is incorrect ", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "val@mail.com",
      password: "password1",
    })
    .expect(400);
});
it("fails if user does not exists ", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "val@mail1.com",
      password: "password1",
    })
    .expect(400);
});
