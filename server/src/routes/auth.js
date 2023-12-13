import Router from "koa-router";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = new Router();

router.post("/signup", async (ctx) => {
  try {
    let newUser = new User(ctx.request.body);
    await newUser.save();
    ctx.status = 201;
    ctx.body = { message: "User created successfully" };
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      ctx.status = 400;
      ctx.body = { message: "Username or email already exists" };
      return;
    }
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.post("/signin", async (ctx) => {
  try {
    const user = await User.findOne({ email: ctx.request.body.email });
    console.log("User found:", user); // For debugging, remove in production

    if (user) {
      const isMatch = await user.comparePassword(ctx.request.body.password);
      console.log("Password match:", isMatch); // For debugging, remove in production

      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1d" });
        ctx.body = { token, username: user.username };
      } else {
        ctx.status = 401;
        ctx.body = "Authentication failed";
      }
    } else {
      ctx.status = 401;
      ctx.body = "User not found";
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    ctx.status = 500;
    ctx.body = error.message;
  }
});

export default router;
