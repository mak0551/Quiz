import { pool } from "../database.js/db.js";

export const createTeacher = async (req, res) => {
  try {
    const { user_id, school_id } = req.body;
    const teacher = await pool.query(
      "insert into teacher(user_id, school_id) values($1,$2) returning *",
      [user_id, school_id]
    );
    res.status(200).json(teacher);
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await pool.query("select * from teacher");
    res.status(200).json(teachers.rows);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const getSingleTeacher = async (req, res) => {
  try {
    const { id } = req.body;
    const teacher = await pool.query(
      "select * from teacher where teacher_id = $1",
      [id]
    );
    if (teacher.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(teacher.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ eror: "internal server error", message: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, school_id } = req.body;
    const updatedTeacher = await pool.query(
      " update teacher set user_id = $1, school_id = $2 returning *",
      [user_id, school_id]
    );
    if (updatedTeacher.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await pool.query(
      "delete from teacher where teacher_id = $1 returning *",
      [id]
    );
    if (deletedTeacher.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};
