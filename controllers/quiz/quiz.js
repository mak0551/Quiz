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
      "insert into questions(quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, category) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
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
    console.log(newQuestion);
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
    res.status(200).json(questions.rows);
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
    res.status(200).json(questions.rows);
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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const updatedquestion = await pool.query(
      `update questions set ${setQuery} where question_id = $${
        values.length + 1
      } returning *`,
      values
    );
    if (updatedquestion.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(updatedquestion.rows[0]);
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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const quiz = await pool.query(
      `update quizzes set ${setQuery} where quizzes_id = $${
        values.length + 1
      } returning *`,
      values
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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const student_quiz = await pool.query(
      `update student_quiz set ${setQuery} where student_quiz_id = $${
        values.length + 1
      } returning *`,
      values
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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const student_quiz_details = await pool.query(
      `update student_quiz_details set ${setQuery} where student_quiz_details_id = $${
        values.length + 1
      } returning *`,
      values
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
