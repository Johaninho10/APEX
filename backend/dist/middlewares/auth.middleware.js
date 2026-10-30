import asyncHandler from "express-async-handler";
import { getAuth, clerkClient } from "@clerk/express";
const authMiddleware = asyncHandler(async (req, res, next) => {
    const { isAuthenticated, userId } = getAuth(req);
    console.log(req.headers.authorization);
    if (!isAuthenticated) {
        res.status(401);
        throw new Error("Unauthorized, please login");
    }
    const user = await clerkClient.users.getUser(userId);
    req.user = user;
    next();
});
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map