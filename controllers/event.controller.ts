import { Request, Response } from "express";
import prisma from "../prisma";

export const createEvent = async (req: Request, res: Response) => {
  const event = await prisma.event.create({ data: req.body });
  res.json(event);
};

export const getEvents = async (_: Request, res: Response) => {
  const events = await prisma.event.findMany();
  res.json(events);
};

export const updateEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await prisma.event.update({
    where: { id },
    data: req.body
  });
  res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.event.delete({ where: { id } });
  res.json({ message: "Event deleted" });
};
