import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the props
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//an interface that describes the properties
//that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

//an interface that descr. a props that user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  // function keyword is needed to access doc info via this keyword

  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    //override pass with hash pass in mongo user model
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
