import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
} from "../controllers/admin.js";
const router = express.Router();

router.post("/create", createAdmin);

router.get("/getall", getAdmins);

router.get("/getbyid/:id", getSingleAdmin);

router.put("/update/:id", updateAdmin);

router.delete("/delete/:id", deleteAdmin);

export default router;
