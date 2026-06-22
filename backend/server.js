// server.js - Complete Backend Code
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cvRoutes = require("./routes/cvRoutes");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/cv", cvRoutes);

// Add JWT verification middleware (Line 19 ke baad)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Please login first." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // ⚠️ CHANGE: Your MySQL username
  password: "181124", // ⚠️ CHANGE: Your MySQL password
  database: "job_portal",
});

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
  console.log("✅ Connected to MySQL Database: job_portal");
});

// JWT Secret Key
const JWT_SECRET = "your_secret_key_change_in_production";

// ========================================
// 1. CANDIDATE REGISTRATION
// ========================================
app.post("/api/auth/register/candidate", async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    currentRole,
    experienceLevel,
    skills,
    qualification,
    preferredCity,
  } = req.body;

  try {
    // Check if email exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("DB Error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        db.query(
          "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
          [email, hashedPassword, "candidate"],
          (err, userResult) => {
            if (err) {
              console.error("User Insert Error:", err);
              return res
                .status(500)
                .json({ message: "User creation failed", error: err.message });
            }

            const userId = userResult.insertId;

            // Insert into candidates table
            db.query(
              "INSERT INTO candidates (user_id, full_name, email, password, phone_number, current_role, experience_level, skills, qualification, preferred_city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [
                userId,
                fullName,
                email,
                hashedPassword,
                phone,
                currentRole || "",
                experienceLevel,
                skills || "",
                qualification || "",
                preferredCity,
              ],
              (err) => {
                if (err) {
                  console.error("Candidate Insert Error:", err);
                  return res.status(500).json({
                    message: "Candidate data save failed",
                    error: err.message,
                  });
                }

                console.log("✅ Candidate registered:", email);
                res.status(201).json({
                  status: "Success",
                  message: "Candidate registered successfully!",
                  userId,
                });
              },
            );
          },
        );
      },
    );
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ========================================
// 2. COMPANY REGISTRATION
// ========================================
app.post("/api/auth/register/company", async (req, res) => {
  const {
    companyName,
    industry,
    email,
    password,
    ntn,
    address,
    hrName,
    phone,
    bio,
  } = req.body;

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("DB Error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
          [email, hashedPassword, "company"],
          (err, userResult) => {
            if (err) {
              console.error("User Insert Error:", err);
              return res
                .status(500)
                .json({ message: "User creation failed", error: err.message });
            }

            const userId = userResult.insertId;

            db.query(
              "INSERT INTO companies (user_id, company_name, industry, ntn_number, address, hr_name, phone_number, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                userId,
                companyName,
                industry,
                ntn,
                address,
                hrName,
                phone,
                bio || "",
              ],
              (err) => {
                if (err) {
                  console.error("Company Insert Error:", err);
                  return res.status(500).json({
                    message: "Company data save failed",
                    error: err.message,
                  });
                }

                console.log("✅ Company registered:", email);
                res.status(201).json({
                  status: "Success",
                  message: "Company registered successfully!",
                  userId,
                });
              },
            );
          },
        );
      },
    );
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ========================================
// 3. LOGIN
// ========================================
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("DB Error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Invalid email or password!" });
        }

        const user = results[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Invalid email or password!" });
        }

        // Generate JWT Token
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: "7d" },
        );

        console.log("✅ User logged in:", email);
        res.status(200).json({
          status: "Success",
          message: "Login successful!",
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        });
      },
    );
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ========================================
// 4. GET ALL JOBS
// ========================================
app.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch jobs", error: err.message });
    }
    res.status(200).json({ jobs: results });
  });
});

// ========================================
// 5. POST A JOB
// ========================================

// POST JOB - UPDATED VERSION
app.post("/api/jobs", (req, res) => {
  const {
    title,
    logo_url,
    company,
    category,
    location,
    salary,
    deadline,
    education_req,
    skills_req,
    age_req,
    userId,
  } = req.body;

  console.log("📤 Received job post request");
  console.log("👤 User ID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Get company_id from user_id
  db.query(
    "SELECT company_id FROM companies WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (results.length === 0) {
        console.error("❌ Company not found for user:", userId);
        return res
          .status(404)
          .json({ message: "Company not found for this user" });
      }

      const companyId = results[0].company_id;
      console.log("🏢 Company ID:", companyId);

      db.query(
        `INSERT INTO jobs 
       (company_id, posted_by_user_id, title, logo_url, company, category, location, salary, deadline, education_req, skills_req, age_req) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          userId,
          title,
          logo_url,
          company,
          category,
          location,
          salary,
          deadline,
          education_req,
          skills_req,
          age_req,
        ],
        (err, result) => {
          if (err) {
            console.error("❌ Job insert error:", err);
            return res
              .status(500)
              .json({ message: "Job posting failed", error: err.message });
          }

          console.log("✅ Job posted successfully! ID:", result.insertId);

          res.status(201).json({
            status: "Success",
            message: "Job posted successfully!",
            jobId: result.insertId,
          });
        },
      );
    },
  );
});

// ========================================
// 6. SUBMIT APPLICATION - UPDATED WITH JWT
// ========================================
app.post("/api/applications", verifyToken, (req, res) => {
  const {
    job_id,
    cover_letter,
    resume_link,
    portfolio_link,
    linkedin_profile,
  } = req.body;
  const user_id = req.userId; // ✅ JWT se user ID

  console.log("📝 Application Request - User ID:", user_id, "Job ID:", job_id);

  if (!job_id) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  // Check if already applied
  db.query(
    "SELECT * FROM applications WHERE job_id = ? AND user_id = ?",
    [job_id, user_id],
    (err, existing) => {
      if (err) {
        console.error("Check error:", err);
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (existing.length > 0) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job!" });
      }

      // Get candidate info from database
      db.query(
        "SELECT full_name, email, phone_number, experience_level FROM candidates WHERE user_id = ?",
        [user_id],
        (err, candidateData) => {
          if (err || candidateData.length === 0) {
            console.error("Candidate not found:", err);
            return res
              .status(404)
              .json({ message: "Candidate profile not found" });
          }

          const candidate = candidateData[0];

          // Insert application WITH user_id ✅
          db.query(
            `INSERT INTO applications 
             (job_id, user_id, applicant_name, applicant_email, phone, experience, 
              resume_link, portfolio_link, linkedin_profile, cover_letter, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'applied')`,
            [
              job_id,
              user_id, // ✅ YE SAVE HOGA AB
              candidate.full_name,
              candidate.email,
              candidate.phone_number,
              candidate.experience_level,
              resume_link || "",
              portfolio_link || "",
              linkedin_profile || "",
              cover_letter || "",
            ],
            (err, result) => {
              if (err) {
                console.error("Application Insert Error:", err);
                return res.status(500).json({
                  message: "Application submission failed",
                  error: err.message,
                });
              }

              console.log("✅ Application submitted! ID:", result.insertId);
              res.status(201).json({
                status: "Success",
                message: "Application submitted successfully!",
                applicationId: result.insertId,
              });
            },
          );
        },
      );
    },
  );
});

// ========================================
// TEST ROUTE
// ========================================
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Job Portal API is running!",
    endpoints: {
      registerCandidate: "POST /api/auth/register/candidate",
      registerCompany: "POST /api/auth/register/company",
      login: "POST /api/auth/login",
      getJobs: "GET /api/jobs",
      postJob: "POST /api/jobs",
      applyJob: "POST /api/applications",
    },
  });
});

// ========================================
// COMPANY DASHBOARD APIs
// ========================================

// Get Company Profile
app.get("/api/company/profile/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      c.company_id,
      c.company_name,
      c.industry,
      c.address,
      c.hr_name,
      c.phone_number,
      c.bio,
      u.email,
      u.created_at
    FROM companies c
    JOIN users u ON c.user_id = u.id
    WHERE c.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Company profile error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.status(200).json({
      status: "Success",
      data: results[0],
    });
  });
});

// Get Company's Posted Jobs
app.get("/api/company/jobs/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      j.id,
      j.title,
      j.category,
      j.location,
      j.salary,
      j.deadline,
      j.logo_url,
      COUNT(a.id) as application_count
    FROM jobs j
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE j.posted_by_user_id = ?
    GROUP BY j.id
    ORDER BY j.id DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Company jobs error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    res.status(200).json({
      status: "Success",
      data: results,
      total: results.length,
    });
  });
});

// Get Company Dashboard Stats
app.get("/api/company/stats/:userId", (req, res) => {
  const { userId } = req.params;

  const queries = {
    totalJobs: "SELECT COUNT(*) as count FROM jobs WHERE posted_by_user_id = ?",
    totalApplications: `
      SELECT COUNT(a.id) as count 
      FROM applications a 
      JOIN jobs j ON a.job_id = j.id 
      WHERE j.posted_by_user_id = ?
    `,
    activeJobs:
      "SELECT COUNT(*) as count FROM jobs WHERE posted_by_user_id = ? AND deadline >= CURDATE()",
    expiredJobs:
      "SELECT COUNT(*) as count FROM jobs WHERE posted_by_user_id = ? AND deadline < CURDATE()",
  };

  const stats = {};
  let completed = 0;

  Object.keys(queries).forEach((key) => {
    db.query(queries[key], [userId], (err, results) => {
      if (!err) {
        stats[key] = results[0].count;
      }

      completed++;
      if (completed === Object.keys(queries).length) {
        res.status(200).json({
          status: "Success",
          data: stats,
        });
      }
    });
  });
});

// Get Applications for Job
app.get("/api/company/job/:jobId/applications", (req, res) => {
  const { jobId } = req.params;

  const query = `
    SELECT 
      a.id as application_id,
      a.applicant_name,
      a.applicant_email,
      a.phone,
      a.experience,
      a.current_salary,
      a.notice_period,
      a.resume_link,
      a.portfolio_link,
      a.linkedin_profile,
      a.cover_letter,
      a.status,
      a.applied_at,
      c.skills,
      c.qualification,
      c.experience_level,
      c.current_role
    FROM applications a
    LEFT JOIN candidates c ON a.user_id = c.user_id
    WHERE a.job_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Applications error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    res.status(200).json({
      status: "Success",
      data: results,
      total: results.length,
    });
  });
});

// Update Application Status
app.put("/api/company/application/:applicationId/status", (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!["applied", "reviewed", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  db.query(
    "UPDATE applications SET status = ? WHERE id = ?",
    [status, applicationId],
    (err) => {
      if (err) {
        console.error("Status update error:", err);
        return res
          .status(500)
          .json({ message: "Failed to update status", error: err.message });
      }

      res.status(200).json({
        status: "Success",
        message: "Application status updated",
      });
    },
  );
});

// ========================================
// CANDIDATE DASHBOARD APIs
// ========================================

// Get Candidate Profile
app.get("/api/candidate/profile/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      c.candidate_id,
      c.full_name,
      c.email,
      c.phone_number,
      c.current_role,
      c.experience_level,
      c.skills,
      c.qualification,
      c.preferred_city,
      c.resume_path,
      u.created_at
    FROM candidates c
    JOIN users u ON c.user_id = u.id
    WHERE c.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Candidate profile error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    res.status(200).json({
      status: "Success",
      data: results[0],
    });
  });
});

// Get Candidate's Applications
app.get("/api/candidate/applications/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      a.id as application_id,
      a.job_id,
      a.status,
      a.applied_at,
      a.cover_letter,
      j.title as job_title,
      j.company,
      j.location,
      j.salary,
      j.category,
      j.logo_url
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.user_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Candidate applications error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    res.status(200).json({
      status: "Success",
      data: results,
      total: results.length,
    });
  });
});

// Get Candidate Stats
app.get("/api/candidate/stats/:userId", (req, res) => {
  const { userId } = req.params;

  const queries = {
    totalApplications:
      "SELECT COUNT(*) as count FROM applications WHERE user_id = ?",
    pendingApplications:
      'SELECT COUNT(*) as count FROM applications WHERE user_id = ? AND status = "applied"',
    acceptedApplications:
      'SELECT COUNT(*) as count FROM applications WHERE user_id = ? AND status = "accepted"',
    rejectedApplications:
      'SELECT COUNT(*) as count FROM applications WHERE user_id = ? AND status = "rejected"',
  };

  const stats = {};
  let completed = 0;

  Object.keys(queries).forEach((key) => {
    db.query(queries[key], [userId], (err, results) => {
      if (!err) {
        stats[key] = results[0].count;
      }

      completed++;
      if (completed === Object.keys(queries).length) {
        res.status(200).json({
          status: "Success",
          data: stats,
        });
      }
    });
  });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Test API: http://localhost:${PORT}`);
});
