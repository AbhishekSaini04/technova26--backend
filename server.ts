import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {register, login} from "./controllers/auth.controller";
import { verifyOtp } from "./controllers/verifyOtp.controller";
import eventRoutes from "./routes/event.routes";
import { departments } from "./utils/data/departments.utils.data";
import { departmentsWithEvents } from "./utils/data/departmentsWithEvents.utils.data";
dotenv.config();

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', register);
app.post("/verify-otp", verifyOtp);
app.use("/api/events", eventRoutes);
app.post('/login', login);



app.get('/api/departments', (req, res) => {
  return res.status(200).json({ departments });
});
app.get('/api/departmentsWithEvents', (req, res) => {
  return res.status(200).json({ departmentsWithEvents });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});