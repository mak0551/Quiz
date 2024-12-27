import express from "express";
import { createStudent } from "../controllers/student.js";
const router = express.Router();

router.post("/create", createStudent);

export default router;
