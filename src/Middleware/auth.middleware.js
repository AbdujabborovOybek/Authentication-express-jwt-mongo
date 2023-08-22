const tokenService = require("../Service/token.service");

const Auth = async (req, res, next) => {
  try {
    if (req.path === "/signin" || req.path === "/signup") return next();
    const token = req?.headers?.authorization?.split(" ").pop() || null;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        variant: "error",
      });
    }

    const decoded = await tokenService.verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      variant: "error",
      error: err,
    });
  }
};

module.exports = Auth;
