import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signedUpUsers,register, login,  } from "./controllers/auth.controller";
import registrationRoutes from "./routes/registration.routes";
import { verifyOtp } from "./controllers/verifyOtp.controller";
import eventRoutes from "./routes/event.routes";
import { departments } from "./utils/data/departments.utils.data";
import { departmentsWithEvents } from "./utils/data/departmentsWithEvents.utils.data";
import { error } from "node:console";
import { adminMiddleware, } from "./middlewares/admin.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
dotenv.config();

const app = express();
app.use(cors({
  origin: true,   
  credentials: true
}));


const PORT = process.env.PORT || 3010;
// app.use(cors());


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", register);
app.get("/allSignedUpUsers" ,authMiddleware, adminMiddleware, signedUpUsers);
app.post("/verify-otp", verifyOtp);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.post("/login", login);

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
