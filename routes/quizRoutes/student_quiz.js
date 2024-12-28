import express from "express";
import {
  createStudentQuiz,
  deleteStudentQuiz,
  getAllStudentQuiz,
  getSingleStudentQuiz,
  UpdateStudentQuiz,
} from "../../controllers/quiz/student_quiz.js";

const router = express.Router();

router.post("/create", createStudentQuiz);

router.get("/getall", getAllStudentQuiz);

router.get("/getbyid/:id", getSingleStudentQuiz);

router.put("/update/:id", UpdateStudentQuiz);

router.delete("/delete/:id", deleteStudentQuiz);

export default router;
