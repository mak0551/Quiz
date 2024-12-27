import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import user from "./routes/users.js";
import school from "./routes/school.js";
import teacher from "./routes/teacher.js";
import student from "./routes/students.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/user", user);
app.use("/school", school);
app.use("/teacher", teacher);
app.use("/student", student);
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
