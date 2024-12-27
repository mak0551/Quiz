import { pool } from "../database.js/db.js";

export const cerateStudent = async (req, res) => {
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
