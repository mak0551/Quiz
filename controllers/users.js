import { pool } from "../database.js/db.js";
import bcrypt from "bcrypt";

// register/signup user
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


