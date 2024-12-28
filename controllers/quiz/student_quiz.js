import { pool } from "../../database.js/db.js";

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
