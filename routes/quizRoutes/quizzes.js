import express from "express";
import {
  createQuizz,
  deleteQuizz,
  getAllQuizzes,
  getSingleQuizz,
  UpdateQuizz,
} from "../../controllers/quiz/quizzes.js";

const router = express.Router();

router.post("/create", createQuizz);

router.get("/getall", getAllQuizzes);

router.get("/getbyid/:id", getSingleQuizz);

router.put("/update/:id", UpdateQuizz);

router.delete("/delete/:id", deleteQuizz);

export default router;
