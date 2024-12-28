import { pool } from "../../database.js/db.js";

// Questions Apis
export const addQuestion = async (req, res) => {
  try {
    const {
      quiz_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      category,
    } = req.body;
    const newQuestion = await pool.query(
      "insert into questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, category) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        quiz_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        category,
      ]
    );
    res.status(200).json(newQuestion.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

export const getAllQuestionsWithAnswers = async (req, res) => {
  try {
    const questions = await pool.query("select * from questions");
    if (questions.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(questions);
  } catch (err) {
    res
      .status(500)
      .json({ errro: "internal server error", message: err.message });
  }
};

export const getOnlyQuestions = async (req, res) => {
  try {
    const questions = await pool.query("select question_text from questions");
    if (questions.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(questions);
  } catch (err) {
    res
      .status(500)
      .json({ errro: "internal server error", message: err.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await pool.query(
      "select * from questions where question_id = $1",
      [id]
    );
    if (questions.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(questions.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      quiz_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      category,
    } = req.body;
    const updatedquestion = await pool.query(
      "update questions set quiz_id = $1, question_text = $2, option_a = $3, option_b = $4, option_c = $5, option_d = $6, correct_option = $7, category = $8 where questions_id = $9 returning *",
      [
        quiz_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        category,
        id,
      ]
    );
    if (updatedquestion.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(updatedquestion);
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await pool.query(
      "delete from questions where question_id = $1 returning *",
      [id]
    );
    if (deletedQuestion.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errro: "internal server error", message: err.message });
  }
};

// Quizzes Apis
export const createQuizz = async (req, res) => {
  try {
    const { quiz_title, description, teacher_id } = req.body;
    const newQuiz = await pool.query(
      "insert into quizzes(quiz_title, description, teacher_id) values($1, $2, $3) returning *",
      [quiz_title, description, teacher_id]
    );
    res.status(200).json(newQuiz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quiz = await pool.query("select * from quizzes");
    if (quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(quiz.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getSingleQuizz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await pool.query(
      "select * from quizzes where quizzes_id = $1",
      [id]
    );
    if (quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(quiz.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const UpdateQuizz = async (req, res) => {
  try {
    const { id } = req.params;
    const { quiz_title, description, teacher_id } = req.body;
    const quiz = await pool.query(
      "update quizzes set quiz_title = $1, description = $2, teacher_id =$3 where quizzes_id = $4 returning *",
      [quiz_title, description, teacher_id, id]
    );
    if (quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(quiz.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const deleteQuizz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await pool.query(
      "delete from quizzes where quizzes_id = $1 returning *",
      [id]
    );
    if (deletedQuiz.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json(deletedQuiz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

// student_quiz
export const createStudentQuiz = async (req, res) => {
  try {
    const { student_id, quiz_id, score, completed_at } = req.body;
    const student_quizz = await pool.query(
      "insert into student_quiz(student_id , quiz_id, score, completed_at) values($1, $2, $3, $4) returning *",
      [student_id, quiz_id, score, completed_at]
    );
    res.status(200).json(student_quizz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getAllStudentQuiz = async (req, res) => {
  try {
    const student_quiz = await pool.query("select * from student_quiz");
    if (student_quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getSingleStudentQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const student_quiz = await pool.query(
      "select * from student_quiz where student_quiz_id = $1",
      [id]
    );
    if (student_quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const UpdateStudentQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, quiz_id, score, completed_at } = req.body;
    const student_quiz = await pool.query(
      "update student_quiz set student_id = $1, quiz_id = $2, score =$3 , completed_at= $4 where student_quiz_id = $5 returning *",
      [student_id, quiz_id, score, completed_at, id]
    );
    if (student_quiz.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const deleteStudentQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudentQuiz = await pool.query(
      "delete from student_quiz where student_quiz_id = $1 returning *",
      [id]
    );
    if (deletedStudentQuiz.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json(deletedStudentQuiz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

//student_quiz_details
export const createStudentQuizDetails = async (req, res) => {
  try {
    const { studentquiz_id, question_id, selected_option, is_correct } =
      req.body;
    const student_quizz_details = await pool.query(
      "insert into student_quiz_details(studentquiz_id, question_id, selected_option, is_correct) values($1, $2, $3, $4) returning *",
      [studentquiz_id, question_id, selected_option, is_correct]
    );
    res.status(200).json(student_quizz_details);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getAllStudentQuizDetails = async (req, res) => {
  try {
    const student_quiz_details = await pool.query(
      "select * from student_quiz_details"
    );
    if (student_quiz_details.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz_details.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const getSingleStudentQuizDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const student_quiz_details = await pool.query(
      "select * from student_quiz_details where student_quiz_details_id = $1",
      [id]
    );
    if (student_quiz_details.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz_details.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const UpdateStudentQuizDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentquiz_id, question_id, selected_option, is_correct } =
      req.body;
    const student_quiz_details = await pool.query(
      "update student_quiz_details set studentquiz_id = $1, question_id = $2, selected_option = $3, is_correct = $4 where student_quiz_details_id = $5 returning *",
      [studentquiz_id, question_id, selected_option, is_correct, id]
    );
    if (student_quiz_details.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(student_quiz_details.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const deleteStudentQuizDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudentQuizDetails = await pool.query(
      "delete from student_quiz_details where student_quiz_details_id = $1 returning *",
      [id]
    );
    if (deletedStudentQuizDetails.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json(deletedStudentQuizDetails);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
