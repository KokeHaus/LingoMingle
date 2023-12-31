import jwt from "jsonwebtoken";

const SKIP_AUTH = true;
const allowedRoutes = ["/api/signin"];

export async function AuthMiddleware(ctx, next) {
  // Allow unauthenticated access to allowed routes
  if (allowedRoutes.includes(ctx.path) || SKIP_AUTH) {
    console.log("AuthMiddleware: Skipping auth -", ctx.path);
    ctx.auth = { authorized: false };
    return next();
  }

  const token = ctx.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("AuthMiddleware: Access denied");
    ctx.status = 401;
    ctx.body = { message: "No token provided" };
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    if (!userId) {
      console.log("AuthMiddleware: Access denied");
      ctx.status = 401;
      ctx.body = { message: "Invalid or expired token" };
      return;
    }

    ctx.auth = {
      authorized: true,
      userId,
    };

    await next();
  } catch (err) {
    console.log("AuthMiddleware: Access denied", err);
    ctx.status = 401;
    ctx.body = { message: "Invalid or expired token" };
    return;
  }
}
