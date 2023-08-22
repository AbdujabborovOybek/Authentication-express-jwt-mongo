const db = require("../../config.mongodb");
const user = db.collection("user");
const { v5: uuidv5 } = require("uuid");
const tokenService = require("./token.service");

class userService {
  // Sign up Path: "/signup" (POST) (Public) {fullname, username, password}
  static async signup(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.password = uuidv5(data.password, uuidv5.URL);
        await user.createIndex({ username: 1 }, { unique: true });
        await user.insertOne(data);
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // Sign in Path: "/signin" (POST) (Public) {username, password}
  static async signin(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password: pass } = await data;
        const password = uuidv5(pass, uuidv5.URL);
        const userData = await user.findOne({ username, password });
        if (!userData) resolve(null);
        const token = await tokenService.generateToken(userData);
        const loginData = { userData, token };
        resolve(loginData);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // Get all users Path: "/user" (GET) (Private) {token}
  static async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await user.find().toArray();
        if (!users) resolve(null);
        resolve(users);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}

module.exports = userService;
