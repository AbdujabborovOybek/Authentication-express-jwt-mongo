const rt = require("express").Router();

// Router for users
const user = require("./Controller/user.control");
const uv = require("./Validation/user.validation");
rt.post("/signup", [uv.signup], user.signup);
rt.post("/signin", [uv.signin], user.signin);
rt.get("/get/user", user.getAll);
rt.get("/get/user/:id", user.getOne);
rt.patch("/update/user/:id", user.update);
rt.delete("/delete/user/:id", user.delete);

module.exports = rt;
