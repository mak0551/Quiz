import { pool } from "../database.js/db.js";

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
    const body = req.body;
    const body_keys = Object.keys(body);
    const body_values = Object.keys(body);
    const values = [...body_values, id];
    const setQuery = body_keys
      .map((keys, index) => `${keys} = $${index + 1}`)
      .join(",");
    const result = await pool.query(
      `UPDATE schools SET ${setQuery} WHERE school_id = $${
        values.length + 1
      } RETURNING *`,
      values
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
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(204).json({ message: "school deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
