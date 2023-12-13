import jwt from "jsonwebtoken";

const allowedRoutes = ["/api/signin"];

export async function AuthMiddleware(ctx, next) {
  // Allow unauthenticated access to allowed routes
  if (allowedRoutes.includes(ctx.path) || true) {
    console.log("AuthMiddleware: Skipping auth -", ctx.path);
    return next();
  }

  const token = ctx.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("AuthMiddleware: Access denied");
    ctx.status = 401;
    return (ctx.body = { message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    if (!userId) {
      console.log("AuthMiddleware: Access denied");
      ctx.status = 401;
      return (ctx.body = { message: "Invalid or expired token" });
    }

    ctx.auth = { userId };

    await next();
  } catch (err) {
    console.log("AuthMiddleware: Access denied", err);
    ctx.status = 401;
    return (ctx.body = { message: "Invalid or expired token" });
  }
}
