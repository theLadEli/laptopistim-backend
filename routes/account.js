import express from "express";
import db from '../config/database.js';
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await db("users").where({ id: req.user.userId}).first();
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ 
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
            city: user.city
        });
    } catch (err) {
        console.error("Error in /account:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;