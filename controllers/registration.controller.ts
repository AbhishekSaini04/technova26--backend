import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
// import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
// interface DecodedToken {
//   id: number;
//   role: Role;
//   email: string;
//   name: string;
// }

import { AuthRequest } from "../middlewares/auth.middleware";
// interface teamMember {
//   name: string;
//   email: string;
//   mobileNumber: string;
//   registrationId: number;
// }

export const registerEvent = async (req: AuthRequest, res: Response) => {
  const { teamName, teamMembers } = req.body;

  const eventId = Number(req.params.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  if (!Array.isArray(teamMembers)) {
    return res.status(400).json({
      error: "teamMembers must be an array",
    });
  }

  if (
    teamMembers.length < event.minTeamSize ||
    teamMembers.length > event.maxTeamSize
  ) {
    return res.status(400).json({
      error: `Team size must be between ${event.minTeamSize} and ${event.maxTeamSize}`,
    });
  }
  const registration = await prisma.registrationId.create({
    data: {},
  });

  // console.log('====================================');
  // console.log(registration.id);
  // console.log('====================================');

  // const teamMembersWithRegistrationId = teamMembers.map((member) => ({
  //   ...member,
  //   registrationId,
  // })) as teamMember[];

  console.log("====================================");
  console.log(teamMembers, registration.id);
  console.log("====================================");
  const existing = await prisma.registration.findUnique({
    where: {
      userId_eventId: {
        userId: req.user!.id,
        eventId,
      },
    },
  });

  if (existing) {
    return res.status(400).json({
      error: "User already registered for this event",
    });
  }

  try {
    const registration = await prisma.$transaction(async (tx) => {
      const registration = await tx.registration.create({
        data: {
          teamName,
          userId: req.user!.id,
          eventId,
        },
      });
      if (!registration) {
        throw new Error("Failed to create registration");
      }
      const teamMember = await tx.teamMember.createMany({
        data: teamMembers.map((m) => ({
          name: m.name,
          mobileNumber: m.mobileNumber,
          email: m.email,
          registrationId: registration.id,
        })),
      });
      if (!teamMember) {
        await tx.registration.delete({
          where: { id: registration.id },
        });
        throw new Error("Failed to create team members");
      }
    });
    //     const registration = await prisma.registration.create({
    //       data: {
    //         teamName,
    //         eventId,
    //         userId: req.user!.id,
    //       },
    //     });
    //     if (!registration) {
    //       return res.status(500).json({ error: "Failed to create registration" });
    //     }
    //  const teamMembers = await prisma.teamMember.createMany({
    //   data: teamMembersWithRegistrationId
    // })
    // if (!teamMembers) {
    //   await prisma.registration.delete({
    //     where: { id: registration.id }
    //   });
    //   return res.status(500).json({ error: "Failed to create team members" });
    // }

    //     res.json({ message: "Registered successfully", registration, teamMembers });
    res.json({ message: "Registered successfully", registration });
  } catch (error) {
    console.error("Error registering for event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering for the event" });
  }
};

export const myEvents = async (req: AuthRequest, res: Response) => {
  try {
    const data = await prisma.registration.findMany({
      where: { userId: req.user!.id },
      include: {
        event: true,
        teamMember: true,
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
export const allRegistrations = async (req: AuthRequest, res: Response) => {
  try {
    const data = await prisma.registration.findMany({
      include: { event: true, teamMember: true, user: true },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

export const getRegistrationsByEvent = async (
  req: AuthRequest,
  res: Response,
) => {
  const eventId = Number(req.params.id);
  try {
    const registrations = await prisma.registration.findMany({
      where: { eventId },
      include: { teamMember: true, user: true },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
