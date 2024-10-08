const jwt = require("jsonwebtoken");

const middlewaresUser = {
  authenticationUser: async (req, res, next) => {
    const token = req.headers.authorization;
    console.log("accessToken:", token);
    if (token) {
      const accessToken = token.split(" ")[1];
      const res = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      req.email = res.user[0].email;
      req.admin = res.user[0].admin;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
  },

  authorizationUser: (req, res, next) => {
    middlewaresUser.authenticationUser(req, res, () => {
      if (req.admin) {
        next();
      } else {
        return res.status(403).json({ message: "You are not admin" });
      }
    });
  },
};

module.exports = middlewaresUser;
