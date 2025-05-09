import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import base64url from "base64url";

// Lowest level of authorization - Anyone who has logged in can access
const authLvl1 = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or malformed token" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decodedSecret = base64url.toBuffer(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, decodedSecret);


        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }  
});

// Middle level of authorization - Only Faculty and Admin can access
const authLvl2 = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
});

export { authLvl1, authLvl2 };
