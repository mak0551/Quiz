import { pool } from "../database.js/db.js";

export const createTeacher = async (req, res) => {
  try {
    const { user_id, school_id } = req.body;
    const teacher = await pool.query(
      "insert into teacher(user_id, school_id) values($1,$2) returning *",
      [user_id, school_id]
    );
    res.status(200).json(teacher.rows);
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
    const { id } = req.params;
    const teacher = await pool.query(
      "select * from teacher where teacher_id = $1 ",
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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.values(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(",");
    const updatedTeacher = await pool.query(
      `update teacher set ${setQuery} where teacher_id = $${
        body_keys.length + 1
      } returning *`,
      values
    );
    if (updatedTeacher.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(updatedTeacher.rows);
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
