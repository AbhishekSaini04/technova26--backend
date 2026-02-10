"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartment = exports.deleteDepartment = exports.addDepartment = exports.getDepartments = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const node_console_1 = require("node:console");
const getDepartments = async (req, res) => {
    try {
        const departments = await prisma_1.default.department.findMany();
        res.json(departments);
    }
    catch (err) {
        (0, node_console_1.error)(err);
        res.status(500).json({ error: "Failed to fetch departments" });
    }
};
exports.getDepartments = getDepartments;
const addDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Department name is required" });
        }
        const department = await prisma_1.default.department.create({
            data: {
                name,
            },
        });
        res.json(department);
    }
    catch (err) {
        (0, node_console_1.error)(err);
        res.status(500).json({ error: "Failed to add department" });
    }
};
exports.addDepartment = addDepartment;
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Department ID is required" });
        }
        const department = await prisma_1.default.department.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(department);
    }
    catch (err) {
        (0, node_console_1.error)(err);
        res.status(500).json({ error: "Failed to delete department" });
    }
};
exports.deleteDepartment = deleteDepartment;
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const Department = await prisma_1.default.department.findUnique({
                where: {
                    id: Number(id),
                },
            });
            let upperCaseName = name.toUpperCase();
            upperCaseName ? upperCaseName : Department?.name;
            if (!id) {
                return res.status(400).json({ error: "Department ID is required" });
            }
            const department = await prisma_1.default.department.update({
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
        (0, node_console_1.error)(err);
        res.status(500).json({ error: "Failed to update department" });
    }
};
exports.updateDepartment = updateDepartment;
