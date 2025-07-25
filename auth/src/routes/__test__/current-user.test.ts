import request from "supertest";
import { app } from "../../app";

it("resposne with detaiils about cur user", async () => {
  const cookie = (await global.signin()) ?? [""];
  const res = await request(app)
    .get("/api/users/currentuser")

    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not auth", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
