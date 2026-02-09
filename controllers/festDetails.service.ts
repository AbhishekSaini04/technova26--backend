import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const getFestDetails = async (req: Request, res: Response) => {
