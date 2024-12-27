import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
} from "../controllers/teacher.js";
const router = express.Router();

router.post("/create", createTeacher);

router.get("/getall", getAllTeachers);

router.get("/getbyid/:id", getSingleTeacher);

router.put("/update/:id", updateTeacher);

router.delete("/delete/:id", deleteTeacher);

export default router;
