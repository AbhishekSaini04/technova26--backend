import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", getEvents);
router.post("/", authMiddleware, adminMiddleware, createEvent);
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

export default router;
