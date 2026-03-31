const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const bcrypt = require("bcrypt");


// ✅ ดึงข้อมูลทั้งหมด (ไม่เอา password)
router.get("/users", (req, res) => {
  connection.query(
    "SELECT id, firstname, lastname, email, role, is_active, created_at FROM users",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    }
  );
});


// ✅ สมัครสมาชิก (Sign Up)
router.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // 🔹 เช็คค่าว่าง
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔹 เช็ค email ซ้ำก่อน
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        // 🔹 hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
          "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
          [firstname, lastname, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ message: "Insert failed" });

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;