const userService = require("../Service/user.service");

class user {
  async signup(req, res) {
    try {
      await userService.signup(req.body);
      res.status(201).json({
        message: "Your account has been created successfully",
        variant: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Username already exist",
        variant: "error",
      });
    }
  }

  async signin(req, res) {
    try {
      const user = await userService.signin(req.body);

      if (!user) {
        res.status(404).json({
          message: "Username or password is incorrect",
          variant: "warning",
        });
        return null;
      }

      res.status(200).json({
        message: "Welcome your profile",
        variant: "success",
        user: user?.userData || null,
        token: user?.token || null,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
        error: err,
      });
    }
  }

  async getAll(req, res) {
    try {
      console.log(req.user);

      const users = await userService.getAll();
      if (!users) {
        return res.status(404).json({
          message: "No user found",
          variant: "warning",
        });
      }

      res.status(200).json({
        message: "Get all users successfully",
        variant: "success",
        users: users || null,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        variant: "error",
        error: err,
      });
    }
  }

  async getOne(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}

module.exports = new user();
