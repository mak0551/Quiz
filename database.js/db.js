import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  database: "users",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Failed to connect to the database", error.message);
  }
})();
