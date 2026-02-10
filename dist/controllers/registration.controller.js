"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationsByEvent = exports.allRegistrations = exports.myEvents = exports.registerEvent = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// interface DecodedToken {
//   id: number;
//   role: Role;
//   email: string;
//   name: string;
// }
const sendRegistraionConfirmationMail_service_1 = require("../services/sendRegistraionConfirmationMail.service");
// interface teamMember {
//   name: string;
//   email: string;
//   mobileNumber: string;
//   registrationId: number;
// }
const registerEvent = async (req, res) => {
    let { teamName, teamMembers } = req.body;
    teamName = teamName ? teamName : "";
    const eventId = Number(req.params.id);
    const event = await prisma_1.default.event.findUnique({ where: { id: eventId } });
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }
    if (!Array.isArray(teamMembers)) {
        return res.status(400).json({
            error: "teamMembers must be an array",
        });
    }
    if (teamMembers.length === 0) {
        return res.status(400).json({
            error: "At least one team member is required",
        });
    }
    if (teamMembers.length > 1 && teamName === "") {
        return res.status(400).json({
            error: "Team name is required when team members are present",
        });
    }
    if (teamMembers.length < event.minTeamSize ||
        teamMembers.length > event.maxTeamSize) {
        return res.status(400).json({
            error: `Team size must be between ${event.minTeamSize} and ${event.maxTeamSize}`,
        });
    }
    const registration = await prisma_1.default.registrationId.create({
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
    const existing = await prisma_1.default.registration.findUnique({
        where: {
            userId_eventId: {
                userId: req.user.id,
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
        const registration = await prisma_1.default.$transaction(async (tx) => {
            const registration = await tx.registration.create({
                data: {
                    teamName,
                    userId: req.user.id,
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
        // res.json({ message: "Registered successfully", registration, teamMembers });
        try {
            const data = await prisma_1.default.registration.findUnique({
                where: { userId_eventId: { userId: req.user.id, eventId: eventId } },
                include: {
                    user: true,
                    event: true,
                    teamMember: true,
                },
            });
            console.log("====================================");
            console.log(data);
            console.log("====================================");
            if (!data) {
                return res.status(500).json({ error: "Failed to fetch registration" });
            }
            const name = data.user.name;
            const tempTeamName = teamName !== "" ? teamName : name;
            const response = await (0, sendRegistraionConfirmationMail_service_1.sendRegistrationConfirmation)(tempTeamName, data.user.email, data.event.title, data.event.date.toString(), data.event.venue, data.teamMember);
            console.log("====================================");
            console.log(response);
            console.log("====================================");
            res.status(201).json({ message: "Registered successfully", data });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch registrations" });
        }
    }
    catch (error) {
        console.error("Error registering for event:", error);
        res
            .status(500)
            .json({ error: "An error occurred while registering for the event" });
    }
};
exports.registerEvent = registerEvent;
const myEvents = async (req, res) => {
    try {
        const data = await prisma_1.default.registration.findMany({
            where: { userId: req.user.id },
            include: {
                event: true,
                teamMember: true,
            },
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
};
exports.myEvents = myEvents;
const allRegistrations = async (req, res) => {
    try {
        const data = await prisma_1.default.registration.findMany({
            include: { event: true, teamMember: true, user: true },
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
};
exports.allRegistrations = allRegistrations;
const getRegistrationsByEvent = async (req, res) => {
    const eventId = Number(req.params.id);
    try {
        const registrations = await prisma_1.default.registration.findMany({
            where: { eventId },
            include: { teamMember: true, user: true },
        });
        res.json(registrations);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
};
exports.getRegistrationsByEvent = getRegistrationsByEvent;
