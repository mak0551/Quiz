import { pool } from "../../database.js/db.js";

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
