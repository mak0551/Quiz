import { pool } from "../database.js/db.js";

export const createAdmin = async (req, res) => {
  try {
    const { user_id } = req.body;
    const newAdmin = await pool.query(
      "insert into admin (user_id) values($1) returning *",
      [user_id]
    );
    res.status(200).json(newAdmin.rows);
  } catch (err) {
    res
      .status(500)
      .json({ errror: "internal server error", message: err.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await pool.query("select * from admin");
    if (admins.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(admins.rows);
  } catch (err) {
    res
      .status(500)
      .json({ errror: "internal server error", message: err.message });
  }
};

export const getSingleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await pool.query("select * from admin where admin_id = $1", [
      id,
    ]);
    if (admins.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(admins.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ errror: "internal server error", message: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const body_keys = Object.keys(body);  // extracting the keys from the body object example user_id
    const body_values = [...Object.values(body), id] // // extracting the values from the body object example 1
    const setQuery = body_keys.map((key, index)=> `${key} = $${index+1}`).join(",");  // this .join(",") will convert array of strings to single string example from this ["question_text = $1", "category = $2", "option_a = $3"] to "question_text = $1, category = $2, option_a = $3"
    const updatedAdmin = await pool.query(`UPDATE admin SET ${setQuery} WHERE admin_id = $${keys.length + 1} RETURNING *`,body_values);
    if (updatedAdmin.rows.length === 0) {
      return res.status(404).json({ message: "no records found" });
    }
    res.status(200).json(updatedAdmin.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ errror: "internal server error", message: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await pool.query(
      "delete from admin where admin_id = $1 returning *",
      [id]
    );
    if (admins.rowCount === 0) {
      return res.status(404).json({ message: "no records found to delete" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errror: "internal server error", message: err.message });
  }
};
