"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEvents = exports.createEvent = exports.getEventDetails = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getEventDetails = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma_1.default.event.findUnique({ where: { id } });
        if (!event)
            return res.status(404).json({ error: "Event not found" });
        res.json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEventDetails = getEventDetails;
const createEvent = async (req, res) => {
    try {
        const { title, description, department, minTeamSize, maxTeamSize, date, venue, rules, } = req.body;
        if (!title ||
            !description ||
            !department ||
            !minTeamSize ||
            !maxTeamSize ||
            !date ||
            !venue) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (minTeamSize > maxTeamSize) {
            return res.status(400).json({
                error: "Minimum team size cannot be greater than maximum team size",
            });
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const event = await prisma_1.default.event.create({
            data: {
                title,
                description,
                department,
                minTeamSize: Number(minTeamSize),
                maxTeamSize: Number(maxTeamSize),
                date: new Date(date),
                venue,
                rules,
                imagePath: file.path,
            },
        });
        res.status(201).json({
            message: "Event created successfully",
            event,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createEvent = createEvent;
const getEvents = async (_, res) => {
    try {
        const events = await prisma_1.default.event.findMany();
        res.json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEvents = getEvents;
const updateEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma_1.default.event.findUnique({ where: { id } });
        if (!existingEvent)
            return res.status(404).json({ error: "Event not found" });
        const title = req.body?.title ? req.body.title : existingEvent.title;
        const description = req.body?.description
            ? req.body.description
            : existingEvent.description;
        const department = req.body?.department
            ? req.body.department
            : existingEvent.department;
        const minTeamSize = req.body?.minTeamSize !== undefined
            ? req.body.minTeamSize
            : existingEvent.minTeamSize;
        const maxTeamSize = req.body?.maxTeamSize !== undefined
            ? req.body.maxTeamSize
            : existingEvent.maxTeamSize;
        if (minTeamSize > maxTeamSize) {
            return res.status(400).json({
                error: "Minimum team size cannot be greater than maximum team size",
            });
        }
        const date = req.body?.date ? new Date(req.body.date) : existingEvent.date;
        const venue = req.body?.venue ? req.body.venue : existingEvent.venue;
        const rules = req.body?.rules !== undefined ? req.body.rules : existingEvent.rules;
        const file = req.file;
        const imagePath = file ? file.path : existingEvent.imagePath;
        // console.log("came to here");
        const event = await prisma_1.default.event.update({
            where: { id },
            data: {
                title,
                description,
                department,
                minTeamSize: Number(minTeamSize),
                maxTeamSize: Number(maxTeamSize),
                date: new Date(date),
                venue,
                rules,
                imagePath,
            },
        });
        res.json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.event.delete({ where: { id } });
        res.json({ message: "Event deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteEvent = deleteEvent;
