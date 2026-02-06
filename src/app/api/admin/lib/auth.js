import jwt from "jsonwebtoken";

export const ADMIN_COOKIE_NAME = "admin_token";

export function signAdminToken(admin) {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return jwt.sign(
    {
      id: String(admin._id),
      email: admin.email,
      role: admin.role || "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyAdminToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}
