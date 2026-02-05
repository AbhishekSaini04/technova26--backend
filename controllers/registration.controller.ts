import { Request, Response } from "express";
import {prisma} from "../lib/prisma";

export const registerEvent = async (req: Request, res: Response) => {
  const { eventId, teamName } = req.body;

  await prisma.registration.create({
    data: {
      userId: req.user!.id,
      eventId,
      teamName
    }
  });

  res.json({ message: "Registered successfully" });
};

export const myEvents = async (req: Request, res: Response) => {
  const data = await prisma.registration.findMany({
    where: { userId: req?.user!.id },
    include: { event: true }
  });

  res.json(data);
};
