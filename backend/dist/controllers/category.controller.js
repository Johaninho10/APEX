import prisma from "../lib/prisma.js";
import asyncHandler from "express-async-handler";
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await prisma.category.findMany();
    res.status(201).json({
        success: true,
        categories,
    });
});
export const createCategory = asyncHandler(async (req, res) => {
    const { name, type, icon_family, icon_name, foreground, background } = req.body;
    if (!name.trim() ||
        !type.trim() ||
        !icon_family.trim() ||
        !icon_name.trim() ||
        !foreground.trim() ||
        !background.trim()) {
        res.status(400);
        throw new Error("All fields are required");
    }
    if (type !== "INCOME" && type !== "EXPENSE") {
        res.status(400);
        throw new Error("Invalid type value");
    }
    const category = await prisma.category.create({
        data: {
            name: name.trim(),
            type: type,
            icon_family: icon_family.trim(),
            icon_name: icon_name.trim(),
            foreground: foreground.trim(),
            background: background.trim(),
        },
    });
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
    });
});
//# sourceMappingURL=category.controller.js.map