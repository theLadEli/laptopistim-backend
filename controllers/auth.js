import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/database.js";
import dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });
const SECRET_KEY = process.env.JWT_SECRET;

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db("users").where({ email }).first();
        console.log(user)

        if (!user) {
            throw new Error("No account found with this email.")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect password. Try again.")
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "7d" });

        res.json({ token, userId: user.id });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { firstName, lastName, email, phone, city, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await db("users").where({email}).first();
        if(existingUser) {            
            return res.status(401).json({message: "Email already in use. Try logging in."})
        }

        const [userId] = await db("users").insert({
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            city,
            password: hashedPassword,
        }).returning("id");

        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
        res.json({ token, userId });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error" });
    }
};
