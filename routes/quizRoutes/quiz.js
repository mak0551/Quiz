import express from "express";
import {
  addQuestion,
  createQuizz,
  createStudentQuiz,
  createStudentQuizDetails,
  deleteQuestion,
  deleteQuizz,
  deleteStudentQuiz,
  deleteStudentQuizDetails,
  getAllQuestionsWithAnswers,
  getAllQuizzes,
  getAllStudentQuiz,
  getAllStudentQuizDetails,
  getOnlyQuestions,
  getQuestionById,
  getSingleQuizz,
  getSingleStudentQuiz,
  getSingleStudentQuizDetails,
  updateQuestion,
  UpdateQuizz,
  UpdateStudentQuiz,
  UpdateStudentQuizDetails,
} from "../../controllers/quiz/quiz.js";
const router = express.Router();

// questions routes
router.post("/question/create", addQuestion);

router.get("/question/getwithanswers", getAllQuestionsWithAnswers);

router.get("/question/getonlyquestion", getOnlyQuestions);

router.get("/question/getbyid/:id", getQuestionById);

router.put("/question/update/:id", updateQuestion);

router.delete("/question/delete/:id", deleteQuestion);

// quizzes routes
router.post("/quizzes/create", createQuizz);

router.get("/quizzes/getall", getAllQuizzes);

router.get("/quizzes/getbyid/:id", getSingleQuizz);

router.put("/quizzes/update/:id", UpdateQuizz);

router.delete("/quizzes/delete/:id", deleteQuizz);

// student_quiz routes
router.post("/student-quiz/create", createStudentQuiz);

router.get("/student-quiz/getall", getAllStudentQuiz);

router.get("/student-quiz/getbyid/:id", getSingleStudentQuiz);

router.put("/student-quiz/update/:id", UpdateStudentQuiz);

router.delete("/student-quiz/delete/:id", deleteStudentQuiz);

// student_quiz_details routes
router.post("/student-quiz-details/create", createStudentQuizDetails);

router.get("/student-quiz-details/getall", getAllStudentQuizDetails);

router.get("/student-quiz-details/getbyid/:id", getSingleStudentQuizDetails);

router.put("/student-quiz-details/update/:id", UpdateStudentQuizDetails);

router.delete("/student-quiz-details/delete/:id", deleteStudentQuizDetails);

export default router;
