const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config").app;
const tokenParser = (req, res, next) => {
   const token = req.body.token || req.query.token || req.headers["x-access-token"];

if (!token) {
    return res.status(403).send("A token is required for authentication");
}
try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
} catch (err) {
    return res.status(401).send({ok:false,message:"invalid token"});
}
return next();

};
module.exports = tokenParser