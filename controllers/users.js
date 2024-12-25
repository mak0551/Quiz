import { pool } from "../database.js/db.js";
import bcrypt from "bcrypt";

// creaate user
export const register = async (req, res) => {
  try {
    const { username, email, password, school_id, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO user_table (username, email, password_hash, school_id, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, school_id, role]
    );
    res.status(200).json(newUser);
  } catch (err) {
    res.json({ error: "internal server error", message: err.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM user_table WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
};

// create schools
export const createSchools = async (req, res) => {
  try {
    const { school_name, address, contact_no, contact_email } = req.body;
    const newSchool = await pool.query(
      "INSERT INTO schools (school_name, address, contact_number, contact_email) VALUES ($1, $2, $3, $4) RETURNING *",
      [school_name, address, contact_no, contact_email]
    );
    res.status(200).json(newSchool);
  } catch (err) {
    res.json({ error: "internal server error", message: err.message });
  }
};

// get all schools
export const getSchools = async (req, res) => {
  try {
    const body = await pool.query("SELECT * FROM schools");
    res.status(200).json(body.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", error: error.message });
  }
};

// get school by id
export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM schools WHERE school_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update school
export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { school_name, address, contact_no, contact_email } = req.body;
    const result = await pool.query(
      "UPDATE schools SET school_name = $1, address = $2, contact_number = $3, contact_email = $4 WHERE school_id = $5 RETURNING *",
      [school_name, address, contact_no, contact_email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete school
export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM schools WHERE school_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(204).json({ message: "school deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
