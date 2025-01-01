import { pool } from "../database.js/db.js";

export const createStudent = async (req, res) => {
  try {
    const { user_id, school_id } = req.body;
    const newStudent = await pool.query(
      "insert into student(user_id, school_id) values ($1,$2) returning *",
      [user_id, school_id]
    );
    res.status(200).json(newStudent.rows);
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
    if (students.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(students.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const updatedStudent = await pool.query(
      `update student set ${setQuery} where student_id= $${
        values.length + 1
      } RETURNING *`,
      values
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

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await pool.query(
      "delete from student where student_id = $1 returning *",
      [id]
    );
    if (deletedStudent.rowCount === 0) {
      return res.status(404).json({ message: "student not found to delete" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server errror", message: err.message });
  }
};
