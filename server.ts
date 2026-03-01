import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { signedUpUsers, register, login } from "./controllers/auth.controller";
import registrationRoutes from "./routes/registration.routes";
import { verifyOtp } from "./controllers/verifyOtp.controller";
import eventRoutes from "./routes/event.routes";
import { departments } from "./utils/data/departments.utils.data";
import { departmentsWithEvents } from "./utils/data/departmentsWithEvents.utils.data";
import { adminMiddleware } from "./middlewares/admin.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

/* =====================================================
   ✅ ALLOWED ORIGINS
===================================================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://technova26.netlify.app",
  "https://technovadcrust.org",
  "https://www.technovadcrust.org",
  "https://technova-2026-eight.vercel.app/"
];

// ✅ optional regex safety for www/non-www
const allowedRegex = /^https:\/\/(www\.)?technovadcrust\.org$/;

/* =====================================================
   ✅ SINGLE CLEAN CORS (PRODUCTION SAFE)
===================================================== */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / postman
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        allowedRegex.test(origin)
      ) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

/* =====================================================
   ✅ BASIC MIDDLEWARES
===================================================== */
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =====================================================
   ✅ ROUTES
===================================================== */

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", register);
app.post("/login", login);
app.post("/verify-otp", verifyOtp);

app.get("/allSignedUpUsers", authMiddleware, adminMiddleware, signedUpUsers);

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/api/isadmin", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ isAdmin: true });
});

app.get("/api/departments", (req, res) => {
  return res.status(200).json({ departments });
});

app.get("/api/departmentsWithEvents", (req, res) => {
  return res.status(200).json({ departmentsWithEvents });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

/* =====================================================
   ✅ 404 HANDLER
===================================================== */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* =====================================================
   ✅ START SERVER
===================================================== */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});