import jwt from "jsonwebtoken";
import connectDB from "./db";
import UserModel from "../models/user-schema";

export function getTokenFromRequest(req) {
    return req.cookies.get("token")?.value || null;
}

export function decodeToken(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

export async function getAuthUser(req) {
    const token = getTokenFromRequest(req);
    const decoded = decodeToken(token);
    const userId = decoded?.id;
    if (!userId) return null;

    await connectDB();
    const user = await UserModel.findById(userId).lean();
    if (!user || user.isDisabled) return null;

    return {
        id: String(user._id),
        fullName: user.fullName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        role: user.role || "",
        profileImageUrl: user.profileImageUrl || "",
        createdAt: user.createdAt || null,
        _raw: user,
    };
}

export async function requireAuthUser(req) {
    const user = await getAuthUser(req);
    if (!user) {
        return { user: null, error: { status: 401, message: "Unauthorized" } };
    }
    return { user, error: null };
}

export function getOptionalUserId(req) {
    const token = getTokenFromRequest(req);
    const decoded = decodeToken(token);
    return decoded?.id || null;
}

export function attachUserIdToPayload(payload, req) {
    const userId = getOptionalUserId(req);
    if (userId) {
        payload.userId = userId;
    }
    return payload;
}
