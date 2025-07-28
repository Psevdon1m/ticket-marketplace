import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  // eslint-disable-next-line no-var
  var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "stephen-grinder-course-on-react-and-microservices";
  process.env.NODE_ENV = "test";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //build a JWT payload. {id,email}
  const email = "test10@test.com";
  const id = new mongoose.Types.ObjectId().toHexString();

  const payload = { id, email };

  //create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object {jwt: token}
  const session = { jwt: token };

  //take JSON and encode it as base64
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString("base64");

  //return session=string that the cookie with encoded data

  return [`session=${base64}`];
};
