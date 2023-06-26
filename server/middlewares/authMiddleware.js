const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    
    const user = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.userId = user.userId;
    next();
}
module.exports = authMiddleware;