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
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://technova26.netlify.app",
  ];

  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
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

  // ⭐ handle preflight HERE (VERY IMPORTANT)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://technova26.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// // ⭐ important for preflight
// app.options("*", cors());

const PORT = process.env.PORT || 3010;
// app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", register);
app.get("/allSignedUpUsers", authMiddleware, adminMiddleware, signedUpUsers);
app.post("/verify-otp", verifyOtp);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.post("/login", login);
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
// // for all not handled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
