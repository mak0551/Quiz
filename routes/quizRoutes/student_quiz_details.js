import express from "express";
import {
  createStudentQuizDetails,
  deleteStudentQuizDetails,
  getAllStudentQuizDetails,
  getSingleStudentQuizDetails,
  UpdateStudentQuizDetails,
} from "../../controllers/quiz/student_quiz_details.js";

const router = express.Router();

router.post("/create", createStudentQuizDetails);

router.get("/getall", getAllStudentQuizDetails);

router.get("/getbyid/:id", getSingleStudentQuizDetails);

router.put("/update/:id", UpdateStudentQuizDetails);

router.delete("/delete/:id", deleteStudentQuizDetails);

export default router;
