const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const fileupload = require("express-fileupload");
const axios = require("axios"); // HTTP client to ping your own server

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use("/api", router);
app.use(bodyParser.json());

/* ================= HEALTH ROUTE ================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});
// process.uptime() -> returns how long server has been running in seconds

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running " + PORT);
  });

  /* ============ AUTO SELF PING EVERY 10 MIN ============ */
  const SERVER_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

  setInterval(async () => {
    try {
      await axios.get(`${SERVER_URL}/health`);
      console.log("Self ping successful");
    } catch (error) {
      console.log("Self ping failed");
    }
  }, 10 * 60 * 1000);
});
