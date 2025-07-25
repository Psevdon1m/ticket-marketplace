import request from "supertest";
import { app } from "../../app";

it("returns 201 on successfull signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "val@mail.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "val", password: "123" })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "val@mail.com", password: "123" })
    .expect(400);
});

it("returns a 400 with an missing email & pass", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "12345678" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "12345678" })
    .expect(400);
});

it("has set-cookie header", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "val@mail.com",
      password: "password",
    })
    .expect(201);
  expect(res.get("Set-Cookie")).toBeDefined();
});
