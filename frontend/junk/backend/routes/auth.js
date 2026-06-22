const express = require('express');
const router = express.Router();
const db = require('../db');

// Candidate Registration
router.post('/register/candidate', (req, res) => {
  const {
    fullName, email, password, phone, currentRole,
    experienceLevel, skills, qualification, preferredCity
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO candidates 
    (fullName, email, password, phone, currentRole, experienceLevel, skills, qualification, preferredCity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, password, phone, currentRole, experienceLevel, skills, qualification, preferredCity], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Email already exists or DB error" });
    }

    res.json({ status: "Success", message: "Candidate Registered" });
  });
});

module.exports = router;
