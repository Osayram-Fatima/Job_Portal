const cvParser = require('../services/cvParser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Use your existing database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '181124',
  database: 'job_portal'
});

class CVController {
  
  async uploadAndParseCV(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: 'No CV file uploaded' 
        });
      }

      const { path: filePath, mimetype } = req.file;
      const user_id = req.body.user_id || 1; // Get from JWT in production

      console.log('📄 Parsing CV:', filePath);

      // Parse CV
      const extractedData = await cvParser.parseCV(filePath, mimetype);

      // Validate
      if (!extractedData.email || !extractedData.full_name) {
        return res.status(400).json({
          success: false,
          message: 'Could not extract name/email from CV'
        });
      }

      // Check if candidate exists
      db.query(
        'SELECT * FROM candidates WHERE email = ?',
        [extractedData.email],
        async (err, existingCandidate) => {
          if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ 
              success: false, 
              message: 'Database error' 
            });
          }

          if (existingCandidate.length > 0) {
            // UPDATE existing candidate
            db.query(
              `UPDATE candidates SET 
                full_name = COALESCE(?, full_name),
                phone_number = COALESCE(?, phone_number),
                current_role = COALESCE(?, current_role),
                experience_level = COALESCE(?, experience_level),
                skills = COALESCE(?, skills),
                qualification = COALESCE(?, qualification),
                preferred_city = COALESCE(?, preferred_city),
                resume_path = ?
              WHERE email = ?`,
              [
                extractedData.full_name,
                extractedData.phone_number,
                extractedData.current_role,
                extractedData.experience_level,
                extractedData.skills,
                extractedData.qualification,
                extractedData.preferred_city,
                filePath,
                extractedData.email
              ],
              (err) => {
                if (err) {
                  console.error('Update Error:', err);
                  return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to update profile' 
                  });
                }

                res.status(200).json({
                  success: true,
                  message: 'CV parsed and profile updated!',
                  data: extractedData
                });
              }
            );

          } else {
            // CREATE new candidate
            const tempPassword = await bcrypt.hash('ChangeMe123!', 10);

            // First create user
            db.query(
              'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
              [extractedData.email, tempPassword, 'candidate'],
              (err, userResult) => {
                if (err) {
                  console.error('User Insert Error:', err);
                  return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to create user' 
                  });
                }

                const newUserId = userResult.insertId;

                // Then create candidate
                db.query(
                  `INSERT INTO candidates 
                  (user_id, full_name, email, password, phone_number, current_role, 
                   experience_level, skills, qualification, preferred_city, resume_path)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    newUserId,
                    extractedData.full_name,
                    extractedData.email,
                    tempPassword,
                    extractedData.phone_number || 'Not provided',
                    extractedData.current_role || '',
                    extractedData.experience_level || 'Mid Level',
                    extractedData.skills || '',
                    extractedData.qualification || '',
                    extractedData.preferred_city || '',
                    filePath
                  ],
                  (err, result) => {
                    if (err) {
                      console.error('Candidate Insert Error:', err);
                      return res.status(500).json({ 
                        success: false, 
                        message: 'Failed to create candidate' 
                      });
                    }

                    console.log('✅ Candidate created from CV!');
                    
                    res.status(201).json({
                      success: true,
                      message: 'CV parsed successfully! Profile created.',
                      data: {
                        candidate_id: result.insertId,
                        ...extractedData
                      }
                    });
                  }
                );
              }
            );
          }
        }
      );

    } catch (error) {
      console.error('CV parsing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process CV',
        error: error.message
      });
    }
  }

  getCandidateProfile(req, res) {
    const { candidate_id } = req.params;

    db.query(
      'SELECT * FROM candidates WHERE candidate_id = ?',
      [candidate_id],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Database error'
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Candidate not found'
          });
        }

        const candidate = results[0];
        delete candidate.password; // Remove password

        res.status(200).json({
          success: true,
          data: candidate
        });
      }
    );
  }
}

module.exports = new CVController();