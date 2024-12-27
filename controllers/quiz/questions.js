import { pool } from "../../database.js/db.js";

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
    res.status(200).json(questions);
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
      "update questions set quiz_id = $1, question_text = $2, option_a = $3, option_b = $4, option_c = $5, option_d = $6, correct_option = $7, category = $8 returning *",
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
