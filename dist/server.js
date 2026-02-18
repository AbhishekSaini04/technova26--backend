"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_controller_1 = require("./controllers/auth.controller");
const registration_routes_1 = __importDefault(require("./routes/registration.routes"));
const verifyOtp_controller_1 = require("./controllers/verifyOtp.controller");
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const departments_utils_data_1 = require("./utils/data/departments.utils.data");
const departmentsWithEvents_utils_data_1 = require("./utils/data/departmentsWithEvents.utils.data");
const admin_middleware_1 = require("./middlewares/admin.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4000", // exact frontend origin
    credentials: true, // allow cookies/authorization headers
}));
const PORT = process.env.PORT || 3010;
// app.use(cors());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/signup", auth_controller_1.register);
app.get("/allSignedUpUsers", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, auth_controller_1.signedUpUsers);
app.post("/verify-otp", verifyOtp_controller_1.verifyOtp);
app.use("/api/events", event_routes_1.default);
app.use("/api/registrations", registration_routes_1.default);
app.post("/login", auth_controller_1.login);
app.get("/api/departments", (req, res) => {
    return res.status(200).json({ departments: departments_utils_data_1.departments });
});
app.get("/api/departmentsWithEvents", (req, res) => {
    return res.status(200).json({ departmentsWithEvents: departmentsWithEvents_utils_data_1.departmentsWithEvents });
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
