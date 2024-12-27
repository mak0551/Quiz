import express from "express";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from "../controllers/student.js";
const router = express.Router();

router.post("/create", createStudent);

router.get("/getall", getAllStudents);

router.get("/getbyid/:id", getSingleStudent);

router.put("/update/:id", updateStudent);

export default router;
