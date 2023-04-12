const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../errors/index");

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if auth header is present or if it starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer"))
        throw new UnauthorizedError("No token provided");

    // Check if token is present
    const token = authHeader.split(" ")[1];
    if (!token) throw new UnauthorizedError("No token provided");

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        throw new UnauthorizedError("Access denied");
    }
};

module.exports = jwtAuth;
