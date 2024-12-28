import { pool } from "../../database.js/db.js";

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
    res.status(200).json(quiz.rows);
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
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(deletedQuiz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
