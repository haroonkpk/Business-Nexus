import jwt from 'jsonwebtoken';

export const protectedRoute = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decodedToken;
        next();

    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized" });
    }
}