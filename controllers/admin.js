import { pool } from "../database.js/db.js";

export const createAdmin = async (req, res) => {
  try {
    const { user_id } = req.body;
    const newAdmin = await pool.query(
      "insert into admin (user_id) values($1) resturning *",
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
    const admins = await pool.query("select * from admin where admin_id = $!", [
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
    const { user_id } = req.body;
    const admins = await pool.query(
      "update admin set user_id = $1 where admin_id = $2 returning *",
      [user_id, id]
    );
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
