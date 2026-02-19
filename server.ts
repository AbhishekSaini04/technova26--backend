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
];

/* =====================================================
   ✅ BULLETPROOF MANUAL CORS (handles nginx edge cases)
===================================================== */
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // ✅ handle preflight early
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* =====================================================
   ✅ STANDARD CORS MIDDLEWARE (SAFE VERSION)
===================================================== */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow curl/postman/server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ⭐ IMPORTANT: do NOT throw error
      return callback(null, false);
    },
    credentials: true,
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
