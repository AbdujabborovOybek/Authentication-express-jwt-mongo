const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
const router = require("./src/Router");
const auth = require("./src/Middleware/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(auth);
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
