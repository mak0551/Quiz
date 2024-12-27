import { pool } from "../database.js/db.js";

export const createStudent = async (req, res) => {
  try {
    const { user_id, school_id } = req.body;
    const newStudent = await pool.query(
      "insert into student(user_id, school_id) values ($1,$2) returning *",
      [user_id, school_id]
    );
    res.status(200).json(newStudent);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("select * from student");
    res.status(200).json(students.rows);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await pool.query(
      "select * from student where student_id = $1",
      [id]
    );
    res.status(200).json(students.rows);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, school_id } = req.body;
    const updatedStudent = await pool.query(
      "update student set user_id= $1, school_id= $2 where student_id= $3 RETURNING *",
      [user_id, school_id, id]
    );
    if (updatedStudent.rows.length === 0) {
      return res.status(404).json({ error: "no records found" });
    }
    res.status(200).json(updatedStudent.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

export const deleteStudent = async (req, res) => {};
