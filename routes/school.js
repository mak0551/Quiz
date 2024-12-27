import express from "express";
import {
  createSchools,
  deleteSchool,
  getSchoolById,
  getSchools,
  updateSchool,
} from "../controllers/school.js";
const router = express.Router();

router.post("/create", createSchools);

router.get("/getall", getSchools);

router.get("/getbyid/:id", getSchoolById);

router.put("/update/:id", updateSchool);

router.delete("/delete/:id", deleteSchool)

export default router;
