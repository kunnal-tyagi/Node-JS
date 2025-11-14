require("dotenv").config();

const express = require("express");
const app = express();

// Parse JSON request body
app.use(express.json());

const cookieParser = require("cookie-parser");
const cors = require("cors");

const Authrouter = require("./routes/auth");
const requestRouter = require("./routes/requests");
const profilerouter = require("./routes/profile");
const UserRoutes = require("./routes/user");

app.use(cookieParser());

// ✅ FIX 1 — Correct CORS for localhost
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ FIX 2 — Handle CORS Prefight (OPTIONS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ROUTES
app.use("/", Authrouter);
app.use("/", profilerouter);
app.use("/", requestRouter);
app.use("/", UserRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.originalUrl}`);
});

// SERVER LISTEN
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
