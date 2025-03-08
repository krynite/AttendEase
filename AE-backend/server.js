const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const logger = require("morgan");
const cors = require("cors");

// Importing routers

const userRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");
const studentRouter = required("/.controllers/students");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev")); // Tracking
app.use(methodOverride("_method")); // Tracking methods
// Middleware for using HTTP verbs such as PUT or DELETE

// Morgan for logging HTTP requests
// app.use(morgan("dev"));
// app.post("/users", async (req, res) => {
//   await User.create({ username: "simon", password: "123" });
// });
// app.post("/login", async (req, res) => {
//   //? extract the userrname and password
//   const { username, password } = req.body;
// });

//Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("students", studentRouter;

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
