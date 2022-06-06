const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next, role) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(403);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    if (role === "ALL") next();
    if (user.userType !== role) return res.sendStatus(403);
    next();
  });
}

module.exports = authenticateToken;
