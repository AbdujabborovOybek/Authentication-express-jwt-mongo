const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

class tokenService {
  static async generateToken(data) {
    return jwt.sign(await data, key, { expiresIn: "24h" });
  }

  static async verifyToken(token) {
    return jwt.verify(await token, key);
  }
}

module.exports = tokenService;
