import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {registerEvent, myEvents, allRegistrations, getRegistrationsByEvent} from "../controllers/registration.controller";
const router = Router();

router.post("/register/:id", authMiddleware, registerEvent);
router.get("/myEvents", authMiddleware, myEvents);
router.get("/all", authMiddleware, adminMiddleware, allRegistrations);
router.get("/event/:id", authMiddleware, adminMiddleware, getRegistrationsByEvent);
export default router;