import { prisma } from "../lib/prisma";
import { error } from "node:console";
export const getDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany();
        res.json(departments);
    }
    catch (err) {
        error(err);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
};
export const addDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Department name is required" });
        }
        const department = await prisma.department.create({
            data: {
                name,
            },
        });
        res.json(department);
    }
    catch (err) {
        error(err);
        res.status(500).json({ error: "Failed to add department" });
    }
};
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Department ID is required" });
        }
        const department = await prisma.department.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(department);
    }
    catch (err) {
        error(err);
        res.status(500).json({ error: "Failed to delete department" });
    }
};
export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const Department = await prisma.department.findUnique({
                where: {
                    id: Number(id),
                },
            });
            let upperCaseName = name.toUpperCase();
            upperCaseName ? upperCaseName : Department?.name;
            if (!id) {
                return res.status(400).json({ error: "Department ID is required" });
            }
            const department = await prisma.department.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: upperCaseName,
                },
            });
            res.json(department);
        }
        catch (err) {
            return res.status(404).json({ error: "Department not found" });
        }
    }
    catch (err) {
        error(err);
        res.status(500).json({ error: "Failed to update department" });
    }
};
