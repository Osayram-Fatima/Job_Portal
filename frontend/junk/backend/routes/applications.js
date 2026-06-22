const express = require('express');
const router = express.Router();
const db = require('../db');

// Apply for a job
router.post('/', (req, res) => {
  const {
    job_id, applicant_name, applicant_email, phone,
    experience, current_salary, notice_period, resume_link,
    portfolio_link, linkedin_profile, cover_letter
  } = req.body;

  if (!job_id || !applicant_name || !applicant_email) {
    return res.status(400).json({ status: "Error", message: "Job ID, Name, Email required" });
  }

  const sql = `
    INSERT INTO applications 
    (job_id, applicant_name, applicant_email, phone, experience, current_salary, notice_period, resume_link, portfolio_link, linkedin_profile, cover_letter)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [job_id, applicant_name, applicant_email, phone, experience, current_salary, notice_period, resume_link, portfolio_link, linkedin_profile, cover_letter];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ status: "Success", message: "Application Saved!" });
  });
});

module.exports = router;
