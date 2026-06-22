const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all jobs
router.get('/', (req, res) => {
  db.query("SELECT * FROM jobs", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// POST new job
router.post('/', (req, res) => {
  const { title, company, logo_url, category, location, salary, deadline, education_req, skills_req, age_req } = req.body;

  if (!title || !company) {
    return res.status(400).json({ status: "Error", message: "Title and Company are required" });
  }

  const sql = `
    INSERT INTO jobs 
    (title, company, logo_url, category, location, salary, deadline, education_req, skills_req, age_req)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, company, logo_url, category, location, salary, deadline, education_req, skills_req, age_req], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ status: "Success", message: "Job Posted Successfully!" });
  });
});

module.exports = router;
