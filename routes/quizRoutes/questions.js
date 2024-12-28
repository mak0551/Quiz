import express from "express";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestionsWithAnswers,
  getOnlyQuestions,
  getQuestionById,
  updateQuestion,
} from "../../controllers/quiz/questions.js";
const router = express.Router();

router.post("/create", addQuestion);

router.get("/getwithanswers", getAllQuestionsWithAnswers);

router.get("/getonlyquestion", getOnlyQuestions);

router.get("/getbyid/:id", getQuestionById);

router.put("/update/:id", updateQuestion);

router.delete("/delete/:id", deleteQuestion);

export default router;
