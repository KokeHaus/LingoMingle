import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const saltRounds = 10;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  native: { type: String, required: true },
  target: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await genSalt(saltRounds);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

export default User;
