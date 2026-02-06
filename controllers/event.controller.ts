import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getEventDetails = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, department, teamSize, date, venue, rules } =
      req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        department,
        teamSize: Number(teamSize),
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEvents = async (_: Request, res: Response) => {
  const events = await prisma.event.findMany();
  res.json(events);
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent)
      return res.status(404).json({ error: "Event not found" });
    const title = req.body?.title? req.body.title:existingEvent.title;
    const description = req.body?.description? req.body.description:existingEvent.description;
    const department = req.body?.department ? req.body.department:existingEvent.department;
    const teamSize = req.body?.teamSize !== undefined ? req.body.teamSize : existingEvent.teamSize;
    const date = req.body?.date ? new Date(req.body.date) : existingEvent.date;
    const venue = req.body?.venue ? req.body.venue : existingEvent.venue;
    const rules = req.body?.rules !== undefined ? req.body.rules : existingEvent.rules;
    const file = req.file;
    const imagePath = file ? file.path : existingEvent.imagePath;
    // console.log("came to here");
    
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        department,
        teamSize: Number(teamSize),
        date: new Date(date),
        venue,
        rules,
        imagePath,
      },
    });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.event.delete({ where: { id } });
  res.json({ message: "Event deleted" });
};
